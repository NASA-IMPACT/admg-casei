import React, { useRef } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import parse from "wellknown"

import Map from "../../components/map"
import HeroStats from "../../components/hero-stats"

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

  const containerRef = useRef()

  return (
    <section
      data-cy="campaign-hero"
      ref={containerRef}
      style={{
        display: `grid`,
        gridTemplateColumns: `1fr minmax(auto,  ${theme.layout.maxWidth}) 1fr`,
        width: `100vw`,
        minHeight: `35rem`,
        alignContent: `center`,
      }}
    >
      <div
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(12,21,32, 0.8) 0%, rgba(12,21,32, 0.7)50%, rgba(12,21,32, 0.0)66%)`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
          backgroundRepeat: `no-repeat`,
          height: `47rem`,
          marginTop: `-12rem`,
          zIndex: 0,
          gridArea: `1 / 1 / 1 / 4`,
        }}
      ></div>
      <Map
        style={{
          height: `47rem`,
          marginTop: `-12rem`,
          zIndex: -1,
          gridArea: `1 / 1 / 1 / 4`,
        }}
      />
      <div
        style={{
          gridArea: `1 / 2 / 1 / 2`,
          display: `flex`,
          paddingTop: `11rem`,
          zIndex: 1,
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
