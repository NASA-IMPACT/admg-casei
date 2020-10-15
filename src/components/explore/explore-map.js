import React from "react"
import PropTypes from "prop-types"
import * as turf from "@turf/turf"
import parse from "wellknown"

import Map from "../map"
import MapLayer from "../map-layer"
import MapSource from "../map-source"

const ExploreMap = ({ data }) => {
  const geojson = {
    type: "FeatureCollection",
    features: data.map(b => ({
      type: "Feature",
      geometry: parse(b),
    })),
  }
  const bbox = turf.bbox(geojson)

  return (
    <Map style={{ height: 500 }}>
      <MapSource geojson={geojson} id="explore">
        <MapLayer id="explore" bbox={bbox} />
      </MapSource>
    </Map>
  )
}

ExploreMap.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default ExploreMap
