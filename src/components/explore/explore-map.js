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

// Define the ExploreMap component
const ExploreMap = ({ allData, filteredData, setGeoFilter, aoi, setAoi }) => {
  // State variable for drawing status
  const [isDrawing, setIsDrawing] = useState(false)

  // Clean filteredData by filtering out deployments without spatial bounds
  const cleanedFilteredData = filteredData.reduce((acc, entry) => {
    const filteredDeployments = entry.deployments.filter(
      deployment => deployment.deploymentSpatialBounds
    )
    const cleanedEntry = { ...entry, deployments: filteredDeployments }
    acc.push(cleanedEntry)
    return acc
  }, [])

  // Extract cleaned deployments from the cleanedFilteredData
  const filteredDeployments = cleanedFilteredData.map(d => d.deployments)

  // Extract the spatial bounds of the filtered deployments
  const filteredBounds = filteredDeployments
    .flat()
    .filter(d => d.deploymentSpatialBounds !== null)
    .map(d => d.deploymentSpatialBounds)

  // Create a GeoJSON object from the filteredBounds
  const geojson = {
    type: "FeatureCollection",
    features: filteredBounds.map((bounds, i) => ({
      type: "Feature",
      id: i + 1,
      geometry: parse(bounds),
      properties: {
        id: allData.id,
        shortname: allData.shortname,
      },
    })),
  }
  // Compute and set the initial bounding box
  const [bbox] = useState(() => turfBbox(geojson))

  // Effect to update the GeoFilter when the AOI changes
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

  // Render the Map component along with its children
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

// Define PropTypes for the ExploreMap component
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

// Export
export default ExploreMap
