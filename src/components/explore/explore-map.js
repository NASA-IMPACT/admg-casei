import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import turfArea from "@turf/area"
import turfBbox from "@turf/bbox"
import turfBooleanDisjoint from "@turf/boolean-disjoint"
import parse from "wellknown"

import Map from "../map"
import AoiControl from "../map/aoi-control"
import GeoJsonSource from "../map/geojson-source"
import HoverLayer from "../map/hover-layer"
import BboxLayer from "../map/bbox-layer"

const sortFeaturesBySize = (a, b) => {
  // this is required by the hover effect:
  // to be able to select small features contained within others,
  // they need to be added to the map last
  return turfArea(b.geometry) - turfArea(a.geometry)
}

const ExploreMap = ({ allData, filteredData, setGeoFilter, aoi, setAoi }) => {
  const [isDrawing, setIsDrawing] = useState(false)

  // loop through allData and extract deployments, along with campaign ids and campaign shortname from allData
  const deployments = allData.map(d => d.deployments)

  // Loop through deployments and extract deployment_spatial_bounds from each deployment_spatial_bounds array
  const spatialBounds = deployments
    .flat()
    .filter(d => d.deployment_spatial_bounds !== null)
    .map(d => d.deployment_spatial_bounds)

  var new_geojson = {
    type: "FeatureCollection",
    features: spatialBounds.map((bounds, i) => ({
      type: "Feature",
      id: i + 1,
      geometry: parse(bounds),
      properties: {
        id: allData.id,
        shortname: allData.shortname,
      },
    })),
  }

  const [geojson, setGeojson] = useState(() => ({
    type: "FeatureCollection",
    features: new_geojson.features.sort(sortFeaturesBySize),
  }))
  const [bbox] = useState(() => turfBbox(geojson))

  useEffect(() => {
    // updates the map after a filter was changed
    const updatedFeatures = filteredData
      .filter(d => d.deployments)
      .map((d, i) => ({
        type: "Feature",
        id: i + 1,
        geometry: parse(d.deployment_spatial_bounds),
        properties: {
          id: d.related_campaign.id,
          shortname: d.related_campaign.shortname,
        },
      }))

    setGeojson({
      type: "FeatureCollection",
      features: updatedFeatures.sort(sortFeaturesBySize),
    })
  }, [filteredData])

  useEffect(() => {
    // updates the list of campaign ids intersecting the drawn aoi after the aoi was changed
    setGeoFilter(
      allData
        .flatMap(d => d.deployments)
        .filter(d => d.deployment_spatial_bounds)
        .map((d, i) => ({
          type: "Feature",
          id: i + 1,
          geometry: parse(d.deployment_spatial_bounds),
          properties: {
            id: d.related_campaign.id,
            shortname: d.related_campaign.shortname,
          },
        }))
        .filter(feature => (aoi ? !turfBooleanDisjoint(feature, aoi) : true))
        .map(f => f.properties.id)
    )
  }, [aoi])

  return (
    <Map height={500} basemap="mapbox://styles/mapbox/light-v10">
      <AoiControl
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        aoi={aoi}
        setAoi={setAoi}
      />
      <GeoJsonSource geojson={new_geojson} id="explore">
        <HoverLayer id="explore" isDrawing={isDrawing} />
        <BboxLayer id="explore" bbox={bbox} />
      </GeoJsonSource>
    </Map>
  )
}

ExploreMap.propTypes = {
  allData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      bounds: PropTypes.string,
    }).isRequired
  ).isRequired,
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      bounds: PropTypes.string,
      shortname: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  aoi: PropTypes.shape({
    type: PropTypes.oneOf(["Feature"]),
    id: PropTypes.string.isRequired,
    geometry: PropTypes.object.isRequired,
    properties: PropTypes.object.isRequired,
  }),
  setAoi: PropTypes.func.isRequired,
  setGeoFilter: PropTypes.func.isRequired,
}

export default ExploreMap
