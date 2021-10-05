import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import Layout, { PageBody } from "../components/layout"
import SEO from "../components/seo"
import { Section, SectionHeader, SectionContent } from "../components/layout"
import Hero from "../components/hero"
import Label from "../components/label"
import Button from "../components/button"
import FocusAreaGallery from "../components/focus-area-gallery"
import { RegionCarousel } from "../components/home/region-carousel"
import { GeophysicsGrid } from "../components/home/geophysics-grid"
import { InstrumentsGrid } from "../components/home/instruments-grid"
import { ArrowIcon } from "../icons"
import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const Home = ({ data }) => {
  const [isFBMLoaded, setIsFBMLoaded] = useState(false)

  useEffect(() => {
    // ensure that feedback module is loaded and inititalized
    // (external script added via Helmet (see seo.js))
    if (window.feedback) {
      if (!window.feedback.showForm) {
        window.feedback.init({ showIcon: false })
      }
      setIsFBMLoaded(true)
    }
  }, [])

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
        <Section id="explore" isSpaced>
          <SectionHeader
            tagline="explore"
            headline="CASEI"
            description="From campaigns to instruments, it takes a lot to understand the earth. Start your discovery journey now:"
            id="explore"
          />
          <SectionContent>
            <ul
              css={`
                list-style: none;
                margin: 0;
              `}
              data-cy={`explore-link-list`}
            >
              {["campaigns", "platforms", "instruments"].map(category => (
                <li
                  key={category}
                  css={`
                    padding-bottom: 1rem;
                  `}
                >
                  <Label id="explore-link" display="flex">
                    <Link
                      to={`/explore/${category}`}
                      css={`
                        text-transform: uppercase;
                        color: ${colors[NEGATIVE].linkText} !important;
                        display: flex;
                        align-items: end;
                      `}
                      data-cy={`explore-${category}-link`}
                    >
                      Explore {category}
                      <ArrowIcon color={colors[NEGATIVE].linkText} />
                    </Link>
                  </Label>
                </li>
              ))}
            </ul>
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

        {isFBMLoaded && (
          <Section id="feedback" isSpaced>
            <SectionHeader headline="Provide Feedback" id="feedback" />
            <SectionContent>
              <Button
                action={() => {
                  window.feedback.showForm()
                }}
              >
                How can we improve CASEI?
              </Button>
            </SectionContent>
          </Section>
        )}
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
          }),
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
