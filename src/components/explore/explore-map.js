import React from "react"
import PropTypes from "prop-types"
import * as turf from "@turf/turf"
import parse from "wellknown"

import Map from "../map"
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
  const geojson = {
    type: "FeatureCollection",
    features: data
      .map((b, i) => ({
        type: "Feature",
        id: i + 1,
        geometry: parse(b),
      }))
      .sort(sortFeaturesBySize),
  }
  const bbox = turf.bbox(geojson)

  return (
    <Map style={{ height: 500 }}>
      <GeoJsonSource geojson={geojson} id="explore">
        <HoverLayer id="explore" />
        <BboxLayer id="explore" bbox={bbox} />
      </GeoJsonSource>
    </Map>
  )
}

ExploreMap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default ExploreMap
