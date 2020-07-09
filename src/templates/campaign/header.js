import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import parse from "wellknown"
import * as turf from "@turf/turf"
import geoViewport from "@mapbox/geo-viewport"

import theme from "../../utils/theme"

const StatNumber = ({ number, label }) => (
  <>
    <dt style={{ fontSize: `3rem` }}>
      {!number && number !== 0 ? "--" : number}
    </dt>
    <dd style={{ gridRowStart: 2, textTransform: `uppercase` }}>{label}</dd>
  </>
)

StatNumber.propTypes = {
  number: PropTypes.number,
  label: PropTypes.string.isRequired,
}

const Header = ({
  bounds,
  shortname,
  longname,
  focusListing,
  countDeployments,
  countCollectionPeriods,
  countDataProducts,
}) => {
  const geometry = parse(bounds)
  const geojson = {
    type: "Feature",
    properties: {
      stroke: "#f25d0d",
      "stroke-width": 2,
      "fill-opacity": 0,
    },
    geometry: geometry,
  }
  const [w, s, e, n] = turf.bbox(geometry)
  const west = turf.point([w, (n + s) / 2])
  const east = turf.point([e, (n + s) / 2])
  const options = { units: "degrees" }
  const distance = turf.distance(west, east, options)
  const offsetCoords = turf.transformTranslate(
    geometry,
    distance * 0.5,
    -90,
    options
  )

  const scaledCoords = turf.bbox(
    turf.transformScale(offsetCoords, 1.4, options)
  )
  const size = [theme.layout.maxWidth, 560]
  const viewport = geoViewport.viewport(scaledCoords, size)
  const overlay = encodeURIComponent(JSON.stringify(geojson))
  const accessToken =
    "pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJja2JxbjJhbGQybnpnMnJwdnk0NXloMmt1In0.5ciMNUW3yaadjwmlDLTugw"

  const url = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/geojson(${overlay})/${viewport.center.join(
    ","
  )},${viewport.zoom}/${size.join("x")}?access_token=${accessToken}`

  return (
    <header
      style={{
        display: `flex`,
        background: `linear-gradient(90deg, rgba(12,21,32, 0.8) 0%, rgba(12,21,32, 0.7)50%, rgba(12,21,32, 0.0)66%), url("${url}") bottom center no-repeat`,
        padding: `11rem 5rem 0 5rem`,
        margin: `0 -5rem`,
        height: `35rem`,
      }}
    >
      <div style={{ flex: `2` }}>
        <div>
          <p>{shortname}</p>
          <h1>{longname}</h1>
          <p>{focusListing}</p>
        </div>
        <dl style={{ display: `grid` }} data-cy="stats">
          <StatNumber number={countDeployments} label="Deployments" />
          <StatNumber
            number={countCollectionPeriods}
            label="Collection Periods"
          />
          <StatNumber number={countDataProducts} label="Data Products" />
        </dl>
      </div>
      <div style={{ flex: `1` }}></div>
    </header>
  )
}

export const headerFields = graphql`
  fragment headerFields on campaign {
    bounds: spatial_bounds
    shortname: short_name
    longname: long_name
    focus: focus_areas {
      shortname: short_name
    }
    countCollectionPeriods: number_collection_periods
    countDataProducts: number_data_products
    countDeployments: number_deployments
  }
`

Header.propTypes = {
  bounds: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  focusListing: PropTypes.string.isRequired,
  countDeployments: PropTypes.number.isRequired,
  countCollectionPeriods: PropTypes.number.isRequired,
  countDataProducts: PropTypes.number,
}

export default Header
