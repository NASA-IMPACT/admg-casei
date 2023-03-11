import React, { useRef } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"
import turfBbox from "@turf/bbox"
import { multiPolygon } from "@turf/helpers"
import parse from "wellknown"
import { createResolvers } from "gatsby"
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
  bounds,
  longname,
  shortname,
  focusListing,
  countDeployments,
  countCollectionPeriods,
  countDataProducts,
  deployments,
}) => {

  // graphql query for all spatial bounds here
  var data = useStaticQuery(allSpatialBounds)
  // console.log(data, 'the static query data')

  var listOfSpatialBounds = data.allCampaign.nodes[0].deployments.map(deployment => deployment.spatial_bounds);

  // parse the array of multi spatial bounds and separate the polygon strings
  var parsedBounds = []
  var _multiSpatialBounds = listOfSpatialBounds.forEach(element => {
    // move the parsed elements into the parsedBounds array
    parsedBounds.push(parse(element))

    console.log(element, 'unparsed elements of listOfSpatialBounds')
  });

  // this handles the geojson and single bounding box for the map
  const geojson = {
    type: "Feature",
    geometry: parse(bounds),
  }
  const bbox = turfBbox(geojson)
  console.log(geojson, 'the single geojson')
  console.log(bbox, 'the single bbox turfed')

  // create a multi polygon geojson object
  const multiPolyGeoJson = multiPolygon(parsedBounds)

  console.log(multiPolyGeoJson, 'the multi polygon geojson')

  // isolate the multiple polygon bounding box values
  console.log(
    multiPolyGeoJson.geometry.coordinates[0].coordinates,
    'the multi polygon coordinates'
  )

  bboxes = multiPolyGeoJson.geometry.coordinates[0].coordinates

  // form latlong like objects
  // https://github.com/mapbox/mapbox-gl-js/blob/198bb84eb9e6dba719e66ab06e9c312ab8596d7b/src/geo/lng_lat.js#L167-L176


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
      <Map height={height ? height : "inherit"}>
        <GeoJsonSource geojson={geojson} id="campaign">
          <BboxLayer id="campaign" bbox={bbox} />
        </GeoJsonSource>
        <GeoJsonSource geojson={multiPolyGeoJson.geometry} id="campaign">
          <BboxLayer id="campaign-multi" bbox={bboxes} />
        </GeoJsonSource>
      </Map>

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
              { number: 100, label: "TESTING ALL BOUNDS" }
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

export const allSpatialBounds = graphql`
  {
    allCampaign(filter: {id: {eq: "fe4d404a-3b84-43af-a0f0-d864ec89bf7b"}}) {
      nodes {
        short_name
        deployments {
          spatial_bounds
          short_name
        }
      }
    }
  }
`

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
    # COMMENT put deployments here

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
  // bounds: PropTypes.string.isRequired,
  longname: PropTypes.string,
  shortname: PropTypes.string.isRequired,
  focusListing: PropTypes.string.isRequired,
  countDeployments: PropTypes.number.isRequired,
  countCollectionPeriods: PropTypes.number.isRequired,
  countDataProducts: PropTypes.number,
  // deployments: PropTypes.array,
}

export default CampaignHero
