import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import Layout, { PageBody } from "../components/layout"
import SEO from "../components/seo"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../components/section"
import Hero from "../components/hero"
import Image from "../components/image"
import FocusAreaGallery from "../components/home/focus-area-gallery"
import { RegionCarousel } from "../components/home/region-carousel"
import { GeophysicsGrid } from "../components/home/geophysics-grid"
import { InstrumentsGallery } from "../components/home/instruments-gallery"
import theme from "../utils/theme"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />

      <Hero
        tagTitle={data.site.siteMetadata.shortname}
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        id="home"
      >
        <Image
          filename="globe.png"
          alt="a globe displaying natural features and slight cloud coverage"
        />
      </Hero>
      <PageBody>
        <SectionBlock id="focus-area">
          <SectionHeader
            tagline="explore nasa earth science"
            headline="Focus Areas"
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
          />
          <SectionContent>
            <RegionCarousel regions={data.allGeographicalRegion.nodes} />
          </SectionContent>
        </SectionBlock>

        <SectionBlock id="geophysical-concepts">
          <SectionHeader
            tagline="explore instruments by"
            headline="Geophysical Concepts"
          />
          <SectionContent>
            <GeophysicsGrid
              geophysicalConcepts={data.allGeophysicalConcept.nodes}
            />
          </SectionContent>
        </SectionBlock>

        <SectionBlock id="platforms">
          <SectionContent columns={[1, 6]}>
            <Image filename="platform.png" alt="aircraft flying over ground" />
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
              <SectionHeader tagline="explore" headline="Platforms" />
              <div>
                <p>
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
          <SectionHeader tagline="explore" headline="Instruments" />
          <SectionContent>
            <InstrumentsGallery instruments={data.allInstrumentType.nodes} />
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
      }
    }
    allGeophysicalConcept {
      nodes {
        id
        shortname: short_name
      }
    }
    allInstrumentType {
      nodes {
        id
        shortname: short_name
        longname: long_name
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
        })
      ),
    }),
    allGeophysicalConcept: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
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
  }).isRequired,
}

export default IndexPage
