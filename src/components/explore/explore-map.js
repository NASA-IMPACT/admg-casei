import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import turfBbox from "@turf/bbox"
import turfBooleanDisjoint from "@turf/boolean-disjoint"
import parse from "wellknown"
import Map from "../map"
import AoiControl from "../map/aoi-control"
import GeoJsonSource from "../map/geojson-source"
import HoverLayer from "../map/hover-layer"
import BboxLayer from "../map/bbox-layer"

const ExploreMap = ({ allData, filteredData, setGeoFilter, aoi, setAoi }) => {
  const [isDrawing, setIsDrawing] = useState(false)

  const cleanedFilteredData = filteredData.reduce((acc, entry) => {
    const filteredDeployments = entry.deployments.filter(
      deployment => deployment.deploymentSpatialBounds
    )
    const cleanedEntry = { ...entry, deployments: filteredDeployments }
    acc.push(cleanedEntry)
    return acc
  }, [])

  const [geojson, setNewGeojson] = useState(() => ({
    type: "FeatureCollection",
    features: [],
  }))

  const [bbox, setBbox] = useState(() => turfBbox(geojson))

  useEffect(() => {
    // loop through allData and extract deployments, along with campaign ids and campaign shortname from allData
    const deployments = allData.map(d => d.deployments)

    // Loop through deployments and extract deploymentSpatialBounds from each deploymentSpatialBounds array
    const spatialBounds = deployments
      .flat()
      .filter(d => d.deploymentSpatialBounds !== null)
      .map(d => d.deploymentSpatialBounds)

    var geojson = {
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

    setBbox(turfBbox(geojson))
    setNewGeojson(geojson)
  }, [cleanedFilteredData])

  useEffect(() => {
    // updates the list of campaign ids intersecting the drawn aoi after the aoi was changed
    setGeoFilter(
      allData
        .flatMap(d => d.deployments)
        .filter(d => d.deploymentSpatialBounds)
        .map((d, i) => ({
          type: "Feature",
          id: i + 1,
          geometry: parse(d.deploymentSpatialBounds),
          properties: {
            id: d.relatedCampaign.id,
            shortname: d.relatedCampaign.shortname,
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
