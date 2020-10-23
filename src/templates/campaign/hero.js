import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import styled from "styled-components"
import Image from "gatsby-image"
import * as turf from "@turf/turf"
import parse from "wellknown"

import HeroStats from "../../components/hero-stats"
import Map from "../../components/map"
import BboxLayer from "../../components/map/bbox-layer"
import GeoJsonSource from "../../components/map/geojson-source"

import theme from "../../utils/theme"

const BackgroundGradient = styled.div`
  background-image: linear-gradient(
      90deg,
      rgba(12, 21, 32, 0.8) 0%,
      rgba(12, 21, 32, 0.7) 50%,
      rgba(12, 21, 32, 0) 66%
    ),
    linear-gradient(
      180deg,
      rgba(12, 21, 32, 0.8) 0%,
      rgba(12, 21, 32, 0.5) 25%,
      rgba(12, 21, 32, 0) 32%
    );
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 47rem;
  margin-top: -12rem;
  z-index: 0;
  grid-area: 1 / 1 / 1 / 4;
`

const CampaignHero = ({
  logo,
  bounds,
  shortname,
  longname,
  focusListing,
  countDeployments,
  countCollectionPeriods,
  countDataProducts,
}) => {
  const geojson = {
    type: "Feature",
    geometry: parse(bounds),
  }
  const bbox = turf.bbox(geojson)

  return (
    <section
      data-cy="campaign-hero"
      style={{
        display: `grid`,
        gridTemplateColumns: `1fr minmax(auto,  ${theme.layout.maxWidth}) 1fr`,
        width: `100vw`,
        minHeight: `35rem`,
        alignContent: `center`,
      }}
    >
      <Map
        style={{
          height: `47rem`,
          marginTop: `-12rem`,
          zIndex: -1,
          gridArea: `1 / 1 / 1 / 4`,
        }}
      >
        <GeoJsonSource geojson={geojson} id="campaign">
          <BboxLayer id="campaign" bbox={bbox} />
        </GeoJsonSource>
      </Map>

      <BackgroundGradient />

      <div
        style={{
          gridArea: `1 / 2 / 1 / 2`,
          display: `flex`,
          paddingTop: `7rem`,
          zIndex: 1,
        }}
      >
        <div style={{ flex: `2`, padding: `0 ${theme.layout.pageMargin}` }}>
          <div>
            {logo && logo.logoImg ? (
              <Image
                alt={logo.logoAlt}
                fixed={logo.logoImg.childImageSharp.fixed}
                style={{ margin: `0` }}
              />
            ) : (
              <p>{shortname}</p>
            )}
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
    logo: logo {
      logoAlt
      logoImg {
        childImageSharp {
          fixed(height: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
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
  logo: PropTypes.shape({
    logoAlt: PropTypes.string.isRequired,
    logoImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }),
  bounds: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  focusListing: PropTypes.string.isRequired,
  countDeployments: PropTypes.number.isRequired,
  countCollectionPeriods: PropTypes.number.isRequired,
  countDataProducts: PropTypes.number,
}

export default CampaignHero
