import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import * as turf from "@turf/turf"
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
  return turf.area(b.geometry) - turf.area(a.geometry)
}

const ExploreMap = ({ allData, filteredData, setGeoFilter, aoi, setAoi }) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [geojson, setGeojson] = useState(() => ({
    type: "FeatureCollection",
    features: filteredData
      .map((d, i) => ({
        type: "Feature",
        id: i + 1,
        geometry: parse(d.bounds),
        properties: {
          id: d.id,
          shortname: d.shortname,
        },
      }))
      .sort(sortFeaturesBySize),
  }))
  const [bbox] = useState(() => turf.bbox(geojson))

  useEffect(() => {
    // updates the map after a filter was changed
    const updatedFeatures = filteredData.map((d, i) => ({
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
        .map((d, i) => ({
          type: "Feature",
          id: i + 1,
          geometry: parse(d.bounds),
          properties: {
            id: d.id,
            shortname: d.shortname,
          },
        }))
        .filter(feature => (aoi ? !turf.booleanDisjoint(feature, aoi) : true))
        .map(f => f.properties.id)
    )
  }, [aoi])

  return (
    <Map style={{ height: 500 }}>
      {/* <AoiControl
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        aoi={aoi}
        setAoi={setAoi}
      /> */}
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
      bounds: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      bounds: PropTypes.string.isRequired,
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
