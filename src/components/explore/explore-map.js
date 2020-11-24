import React, { useState } from "react"
import PropTypes from "prop-types"
import * as turf from "@turf/turf"
import parse from "wellknown"

import Map from "../map"
import GeoFilter from "./geo-filter"
import GeoJsonSource from "../map/geojson-source"
import HoverLayer from "../map/hover-layer"
import BboxLayer from "../map/bbox-layer"

const sortFeaturesBySize = (a, b) => {
  // this is required by the hover effect:
  // to be able to select small features contained within others,
  // they need to be added to the map last
  return turf.area(b.geometry) - turf.area(a.geometry)
}

const ExploreMap = ({ data }) => {
  const [geojson] = useState(() => ({
    type: "FeatureCollection",
    features: data
      .map((d, i) => ({
        type: "Feature",
        id: i + 1,
        geometry: parse(d.bounds),
        properties: {
          id: d.id,
        },
      }))
      .sort(sortFeaturesBySize),
  }))
  const [bbox] = useState(() => turf.bbox(geojson))

  const [isDrawing, setIsDrawing] = useState(false)

  return (
    <Map style={{ height: 500 }}>
      <GeoFilter isDrawing={isDrawing} setIsDrawing={setIsDrawing} />
      <GeoJsonSource geojson={geojson} id="explore">
        <HoverLayer id="explore" isDrawing={isDrawing} />
        <BboxLayer id="explore" bbox={bbox} />
      </GeoJsonSource>
    </Map>
  )
}

ExploreMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      bounds: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default ExploreMap
