import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout, { PageBody } from "../components/layout"
import SEO from "../components/seo"
import { Section, SectionHeader, SectionContent } from "../components/layout"
import Hero from "../components/hero"
import FocusAreaGallery from "../components/focus-area-gallery"
import { RegionCarousel } from "../components/home/region-carousel"
import { GeophysicsGrid } from "../components/home/geophysics-grid"
import { InstrumentsGrid } from "../components/home/instruments-grid"
import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const Home = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" lang="en" />

      <Hero
        title={data.site.siteMetadata.title.replace(
          "Earth Science",
          "Earth\u00a0Science" // add non-breaking space
        )}
        description={data.site.siteMetadata.description}
        cta="Explore CASEI"
        backgroundImage={data.heroImage}
        textToImageRatio={[6, 6]}
        id="home"
      />

      <PageBody id="home">
        <Section id="focus-area" isSpaced>
          <SectionHeader
            tagline="view"
            headline="Earth Science Focus Areas"
            description="NASA’s Earth Science Research and Analysis Program supports
            investigations related to six broad Focus Areas:"
            id="focus"
          />
          <SectionContent>
            <FocusAreaGallery
              focusAreas={data.allFocusArea.nodes}
              size="large"
            />
          </SectionContent>
        </Section>

        <Section id="region-type" isSpaced>
          <SectionHeader
            tagline="explore campaigns by"
            headline="Region Type"
            description="Choose a type of geographical region to explore"
            id="region-type"
          />
          <SectionContent>
            <RegionCarousel regions={data.allGeographicalRegion.nodes} />
          </SectionContent>
        </Section>

        <Section id="geophysical-concepts" isSpaced>
          <SectionHeader
            tagline="explore campaigns by"
            headline="Geophysical Concepts"
            description="NASA investigates a myriad of factors that comprise Earth’s properties, systems, and processes."
            id="geophysical-concepts"
          />
          <SectionContent>
            <GeophysicsGrid
              geophysicalConcepts={data.allGeophysicalConcept.nodes}
            />
          </SectionContent>
        </Section>

        <Section id="platforms" isSpaced>
          <SectionContent columns={[1, 6]}>
            <GatsbyImage
              image={
                data.platformPlaceholder.nasaImg.childImageSharp.gatsbyImageData
              }
              alt={data.platformPlaceholder.nasaImgAlt}
            />
          </SectionContent>
          <SectionContent columns={[7, 6]}>
            <div
              css={`
                height: 100%;
                display: grid;
                gap: 2.5rem;
                align-content: center;
                padding: 1rem;
              `}
            >
              <SectionHeader
                tagline="explore"
                headline="Platforms"
                description="Learn about the variety of air and Earth-based platforms NASA uses to study our home planet."
                id="platforms"
              />
              <Link
                to="/explore"
                state={{ defaultExploreCategory: "platforms" }}
                css={`
                  border: 1px solid ${colors[NEGATIVE].text};
                  padding: 1rem 5rem;
                  text-transform: uppercase;
                `}
                data-cy="explore-platforms-link"
              >
                Explore
              </Link>
            </div>
          </SectionContent>
        </Section>

        <Section id="instruments" isSpaced>
          <SectionHeader
            tagline="explore instruments by"
            headline="Measurement Type"
            id="instruments"
          />
          <SectionContent>
            <InstrumentsGrid measurementTypes={data.allMeasurementType.nodes} />
          </SectionContent>
        </Section>
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  {
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
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
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
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
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
    allMeasurementType {
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
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
  }
`

Home.propTypes = {
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
    allMeasurementType: PropTypes.shape({
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

export default Home
