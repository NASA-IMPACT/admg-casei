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

  // loop through allData and extract deployments from allData
  const deployments = allData.map(d => d.deployments)

  // loop through deployments and extract deployment_spatial_bounds from each deployment_spatial_bounds array
  var spatialBounds = []
  deployments.forEach(deployment => {
    deployment.forEach(d => {

      if (d.deployment_spatial_bounds !== null) {
        spatialBounds.push(d.deployment_spatial_bounds)
      }
    })
  })

  console.log(spatialBounds, "spatial_bounds")

  new_geojson = {
    type: "FeatureCollection",
    features: spatialBounds.map((bounds, i) => ({
      type: "Feature",
      id: i + 1,
      geometry: parse(bounds),
      // properties: {
      //   id: d.id,
      //   shortname: d.shortname,
      // },
    }))
  }

  console.log(new_geojson, "new_geojson")

  const [geojson, setGeojson] = useState(() => ({
    type: "FeatureCollection",
    features: spatialBounds.map((bounds, i) => ({
      type: "Feature",
      id: i + 1,
      geometry: parse(bounds),
      // properties: {
      //   id: d.id,
      //   shortname: d.shortname,
      // },
    }))
      .sort(sortFeaturesBySize),
  }))
  const [bbox] = useState(() => turfBbox(geojson))

  useEffect(() => {
    // updates the map after a filter was changed
    const updatedFeatures = filteredData
      .filter(d => d.bounds)
      .map((d, i) => ({
        type: "Feature",
        id: i + 1,
        geometry: parse(d.bounds),
        properties: {
          id: d.id,
          shortname: d.shortname,
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
        .filter(d => d.bounds)
        .map((d, i) => ({
          type: "Feature",
          id: i + 1,
          geometry: parse(d.bounds),
          properties: {
            id: d.id,
            shortname: d.shortname,
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
      <GeoJsonSource geojson={geojson} id="explore">
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
