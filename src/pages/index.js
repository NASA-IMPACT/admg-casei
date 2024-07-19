import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { FEEDBACK_FORM_URL } from "../utils/constants"
import Layout, { PageBody } from "../components/layout"
import SEO from "../components/seo"
import { Section, SectionHeader, SectionContent } from "../components/layout"
import Hero from "../components/hero"
import Button from "../components/button"
import FocusAreaGallery from "../components/focus-area-gallery"
import { RegionCarousel } from "../components/home/region-carousel"
import { CampaignsTimeline } from "../components/home/campaigns-timeline"

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
        textToImageRatio={[5, 7]}
        id="home"
      />
      <PageBody id="home">
        <Section id="campaigns-timeline" isSpaced>
          <SectionHeader
            headline="NASA Campaigns Timeline"
            id="campaigns-timeline"
          />
          <SectionContent>
            <CampaignsTimeline />
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
        <Section id="feedback" isSpaced>
          <SectionHeader headline="Provide Feedback" id="feedback" />
          <SectionContent>
            <Button
              action={() => {
                window.open(FEEDBACK_FORM_URL, "_blank")
              }}
            >
              How can we improve CASEI?
            </Button>
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
    allFocusArea {
      nodes {
        id
        shortname: short_name
      }
    }
    allGeographicalRegion(sort: { fields: order_priority }) {
      nodes {
        id
        shortname: short_name
        example
        image {
          nasaImgAlt
          gatsbyImg {
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
      gatsbyImg {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
    allCampaign {
      nodes {
        long_name
        short_name
      }
    }
    allPlatform {
      nodes {
        long_name
        short_name
      }
    }
    allInstrument {
      nodes {
        short_name
        long_name
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
      gatsbyImg: PropTypes.shape({
        childImageSharp: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  allCampaign: PropTypes.shape({
    short_name: PropTypes.string,
    long_name: PropTypes.string,
  }),
  allPlatform: PropTypes.shape({
    short_name: PropTypes.string,
    long_name: PropTypes.string,
  }),
  allInstrument: PropTypes.shape({
    short_name: PropTypes.string,
    long_name: PropTypes.string,
  }),
}

export default Home
