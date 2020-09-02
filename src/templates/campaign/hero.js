import React, { useRef } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import parse from "wellknown"
import * as turf from "@turf/turf"
import geoViewport from "@mapbox/geo-viewport"

import HeroStats from "../../components/hero-stats"

import { useContainerDimensions } from "../../utils/helpers"
import theme from "../../utils/theme"

const CampaignHero = ({
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

  const containerRef = useRef()
  const { width } = useContainerDimensions(containerRef)

  const size = [Math.min(width, 1280), 560]
  const viewport = geoViewport.viewport(scaledCoords, size)
  const overlay = encodeURIComponent(JSON.stringify(geojson))
  const accessToken =
    "pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJja2JxbjJhbGQybnpnMnJwdnk0NXloMmt1In0.5ciMNUW3yaadjwmlDLTugw"

  const url = width
    ? `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/static/geojson(${overlay})/${viewport.center.join(
        ","
      )},${viewport.zoom}/${size.join("x")}?access_token=${accessToken}`
    : null // skip while width is to be determinded

  return (
    <section
      data-cy="campaign-hero"
      ref={containerRef}
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(12,21,32, 0.8) 0%, rgba(12,21,32, 0.7)50%, rgba(12,21,32, 0.0)66%), url("${url}")`,
        backgroundPosition: `center`,
        backgroundSize: `cover`,
        backgroundRepeat: `no-repeat`,
        height: `35rem`,
      }}
    >
      <div
        style={{
          display: `flex`,
          maxWidth: theme.layout.maxWidth,
          margin: `0 auto`,
          paddingTop: `11rem`,
        }}
      >
        <div style={{ flex: `2`, padding: `0 ${theme.layout.pageMargin}` }}>
          <div>
            <p>{shortname}</p>
            <h1 data-cy="campaign-hero-header">{longname}</h1>
            <p>{focusListing}</p>
          </div>
          <HeroStats
            statList={[
              { number: countDeployments, label: "Deployments" },
              { number: countCollectionPeriods, label: "Collection Periods" },
              { number: countDataProducts, label: "Data Products" },
            ]}
          />
        </div>
        <div style={{ flex: `1` }}></div>
      </div>
    </section>
  )
}

export const heroFields = graphql`
  fragment heroFields on campaign {
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

CampaignHero.propTypes = {
  bounds: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  focusListing: PropTypes.string.isRequired,
  countDeployments: PropTypes.number.isRequired,
  countCollectionPeriods: PropTypes.number.isRequired,
  countDataProducts: PropTypes.number,
}

export default CampaignHero
