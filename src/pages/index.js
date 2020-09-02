import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"

import Layout, { PageBody } from "../components/layout"
import SEO from "../components/seo"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../components/section"
import Hero from "../components/hero"
import FocusAreaGallery from "../components/home/focus-area-gallery"
import { RegionCarousel } from "../components/home/region-carousel"
import { GeophysicsGrid } from "../components/home/geophysics-grid"
import { InstrumentsGrid } from "../components/home/instruments-grid"
import theme from "../utils/theme"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />

      <Hero
        tagTitle={data.site.siteMetadata.shortname}
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        backgroundImage={data.heroImage}
        id="home"
      />
      <PageBody id="home">
        <SectionBlock id="focus-area">
          <SectionHeader
            tagline="explore nasa earth science"
            headline="Focus Areas"
            to="#focus"
          />
          <SectionContent>
            <FocusAreaGallery
              focusAreas={data.allFocusArea.nodes}
              size="large"
            />
          </SectionContent>
        </SectionBlock>

        <SectionBlock id="region-type">
          <SectionHeader
            tagline="explore campaigns by"
            headline="Region Type"
            to="#region-type"
          />
          <SectionContent>
            <RegionCarousel regions={data.allGeographicalRegion.nodes} />
          </SectionContent>
        </SectionBlock>

        <SectionBlock id="geophysical-concepts">
          <SectionHeader
            tagline="explore campaigns by"
            headline="Geophysical Concepts"
            to="#geophysical-concepts"
          />
          <SectionContent>
            <GeophysicsGrid
              geophysicalConcepts={data.allGeophysicalConcept.nodes}
            />
          </SectionContent>
        </SectionBlock>

        <SectionBlock id="platforms">
          <SectionContent columns={[1, 6]}>
            <Image
              alt={data.platformPlaceholder.nasaImgAlt}
              fluid={data.platformPlaceholder.nasaImg.childImageSharp.fluid}
            />
          </SectionContent>
          <SectionContent columns={[7, 6]}>
            <div
              style={{
                height: `100%`,
                display: `grid`,
                alignContent: `center`,
                padding: `1rem`,
              }}
            >
              <SectionHeader
                tagline="explore"
                headline="Platforms"
                to="#platforms"
              />
              <div>
                <p style={{ marginBottom: `2rem` }}>
                  From aircrafts to balloons, from sensors to plaftorms, it
                  takes a lot to understand earth.
                </p>
                <Link
                  to="/explore/platforms"
                  style={{
                    border: `1px solid ${theme.color.base}`,
                    padding: `1rem 5rem`,
                    textTransform: `uppercase`,
                  }}
                >
                  Explore
                </Link>
              </div>
            </div>
          </SectionContent>
        </SectionBlock>

        <SectionBlock id="instruments">
          <SectionHeader
            tagline="explore"
            headline="Instruments"
            to="#instruments"
          />
          <SectionContent>
            <InstrumentsGrid instrumentTypes={data.allInstrumentType.nodes} />
          </SectionContent>
        </SectionBlock>
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        shortname
        description
      }
    }
    heroImage: nasaImagesJson(shortname: { eq: "Home" }) {
      nasaImgAlt
      nasaImg {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    allFocusArea {
      nodes {
        id
        shortname: short_name
      }
    }
    allGeographicalRegion {
      nodes {
        id
        shortname: short_name
        example
        image {
          nasaImgUrl
          nasaImgAlt
          nasaImg {
            childImageSharp {
              fluid(maxHeight: 550) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allGeophysicalConcept {
      nodes {
        id
        longname: long_name
      }
    }
    allInstrumentType {
      nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    platformPlaceholder: nasaImagesJson(
      shortname: { eq: "placeholder-platform" }
    ) {
      nasaImgAlt
      nasaImg {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

IndexPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
        shortname: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }),
    }),
    heroImage: PropTypes.shape({
      nasaImgAlt: PropTypes.string.isRequired,
      nasaImg: PropTypes.shape({
        childImageSharp: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
    allFocusArea: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
        })
      ),
    }),
    allGeographicalRegion: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          example: PropTypes.string.isRequired,
          image: PropTypes.shape({
            nasaImgUrl: PropTypes.string.isRequired,
            nasaImgAlt: PropTypes.string.isRequired,
          }).isRequired,
        })
      ),
    }),
    allGeophysicalConcept: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ),
    }),
    allInstrumentType: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ),
    }),
    platformPlaceholder: PropTypes.shape({
      nasaImgAlt: PropTypes.string.isRequired,
      nasaImg: PropTypes.shape({
        childImageSharp: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default IndexPage
