import React, { useRef } from "react"
import PropTypes, { any } from "prop-types"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import turfBbox from "@turf/bbox"
import parse from "wellknown"
import { HeroStats } from "../../components/hero"
import Map from "../../components/map"
import BboxLayer from "../../components/map/bbox-layer"
import GeoJsonSource from "../../components/map/geojson-source"
import { ArrowIcon, CampaignIcon } from "../../icons"
import { colors, layout } from "../../theme"
import { useContainerDimensions } from "../../utils/use-container-dimensions"
import { NEGATIVE } from "../../utils/constants"

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
  z-index: 0;
  grid-area: 1 / 1 / 1 / 4;
`

const CampaignHero = ({
  logo150h,
  longname,
  shortname,
  bounds,
  focusListing,
  countDeployments,
  countCollectionPeriods,
  countDataProducts,
  deployments,
}) => {
  const containerRef = useRef()
  const { height } = useContainerDimensions(containerRef)

  return (
    <section
      ref={containerRef}
      data-cy="campaign-hero"
      css={`
         {
          display: grid;
          grid-template-columns: ${`1fr minmax(auto, ${layout.maxWidth}) 1fr`};
          width: 100vw;
          min-height: 35rem;
          align-content: center;
        }
      `}
    >
      <HeroMap bounds={bounds} height={height} deployments={deployments} />
      <BackgroundGradient />
      <div
        css={`
           {
            grid-area: 1 / 2 / 1 / 2;
            display: flex;
            padding: 0 0 7rem 0;
            z-index: 1;
          }
        `}
      >
        <div
          css={`
             {
              flex: 2;
              padding: ${`3rem ${layout.pageMargin}`};
            }
          `}
        >
          <Link
            to="/explore/campaigns"
            css={`
               {
                color: ${colors[NEGATIVE].linkText};
                cursor: pointer;
                display: flex;
                align-items: center;
                margin-bottom: 6rem;
              }
            `}
            data-cy="back-link"
          >
            <ArrowIcon color={colors[NEGATIVE].linkText} direction="left" />
            Back to Explore
          </Link>

          <div
            css={`
               {
                margin-bottom: 6rem;
              }
            `}
          >
            {logo150h && logo150h.gatsbyImg ? (
              <GatsbyImage
                image={logo150h.gatsbyImg.childImageSharp.gatsbyImageData}
                alt={logo150h.description}
                css={`
                   {
                    margin: 0;
                  }
                `}
              />
            ) : (
              <CampaignIcon />
            )}
            <h1 data-cy="campaign-hero-header">{longname || shortname}</h1>
            <p>{focusListing}</p>
          </div>
          <HeroStats
            statList={[
              {
                number: countDeployments,
                label: "Deployment",
                dates: deployments,
              },
              { number: countCollectionPeriods, label: "Collection Periods" },
              { number: countDataProducts, label: "Data Products" },
            ]}
          />
        </div>
        <div
          css={`
             {
              flex: 1;
            }
          `}
        ></div>
      </div>
    </section>
  )
}

export const heroFields = graphql`
  fragment heroFields on campaign {
    logo150h: logo {
      description
      gatsbyImg {
        childImageSharp {
          gatsbyImageData(height: 150, layout: FIXED, placeholder: BLURRED)
        }
      }
    }
    bounds: spatial_bounds
    deployments: deployments {
      spatial_bounds
    }
    shortname: short_name
    longname: long_name
    focus: focus_areas {
      shortname: short_name
    }
    countCollectionPeriods: number_ventures
    countDataProducts: number_data_products
    countDeployments: number_deployments
  }
`

CampaignHero.propTypes = {
  logo150h: PropTypes.shape({
    description: PropTypes.string.isRequired,
    gatsbyImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }),
  bounds: PropTypes.string,
  longname: PropTypes.string,
  shortname: PropTypes.string.isRequired,
  focusListing: PropTypes.string.isRequired,
  countDeployments: PropTypes.number.isRequired,
  countCollectionPeriods: PropTypes.number.isRequired,
  countDataProducts: PropTypes.number,
  deployments: PropTypes.array,
}

export default CampaignHero

const HeroMap = ({ height, deployments }) => {
  // create multispatialbounds object excluding null spatial bounds
  var multiSpatialBounds = deployments
    ? deployments
      .filter(d => d.spatial_bounds !== null)
      .map(deployment => {
        return {
          type: "Feature",
          geometry: parse(deployment.spatial_bounds),
        }
      })
    : null
  if (deployments.length === 0 || deployments === null) {
    return <Map height={height ? height : "inherit"} />
  } else {
    return (
      <Map height={height ? height : "inherit"}>
        {multiSpatialBounds.map((geojson, index) => {
          const bbox = turfBbox(geojson)
          return (
            <GeoJsonSource
              key={index}
              geojson={geojson}
              id={`campaign-${index}`}
            >
              <BboxLayer id={`campaign-${index}`} bbox={bbox} />
            </GeoJsonSource>
          )
        })}
      </Map>
    )
  }
}

HeroMap.propTypes = {
  bounds: PropTypes.string,
  height: any,
  deployments: PropTypes.array,
}
