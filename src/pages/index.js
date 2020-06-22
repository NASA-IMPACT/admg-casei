import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import { Hero } from "../components/home/hero"
import FocusAreaGallery from "../components/home/focus-area-gallery"
import { RegionCarousel } from "../components/home/region-carousel"
import { GeophysicsGrid } from "../components/home/geophysics-grid"
import { InstrumentsGallery } from "../components/home/instruments-gallery"
import theme from "../utils/theme"

const SectionHeader = ({ tagline, headline }) => (
  <div>
    <div style={{ textTransform: `uppercase` }}>{tagline}</div>
    <h2>{headline}</h2>
  </div>
)

SectionHeader.propTypes = {
  tagline: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
}

const styles = {
  section: { marginTop: `8rem` },
}

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />

      <Hero siteMetadata={data.site.siteMetadata} />

      <section style={styles.section} data-cy="focus-area-section">
        <SectionHeader
          tagline="explore nasa earth science"
          headline="Focus Areas"
        />
        <FocusAreaGallery focusAreas={data.allFocusArea.nodes} size="large" />
      </section>

      <section style={styles.section} data-cy="region-type-section">
        <SectionHeader tagline="explore campaigns by" headline="Region Type" />
        <RegionCarousel regions={data.allGeographicalRegion.nodes} />
      </section>

      <section style={styles.section} data-cy="geophysical-concepts-section">
        <SectionHeader
          tagline="explore instruments by"
          headline="Geophysical Concepts"
        />
        <GeophysicsGrid
          geophysicalConcepts={data.allGeophysicalConcept.nodes}
        />
      </section>

      <section style={styles.section} data-cy="platforms-section">
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            columnGap: `5rem`,
          }}
        >
          <div style={{ gridArea: `1 / 1 / 4 / 2` }}>
            <Image filename="platform.png" alt="aircraft flying over ground" />
          </div>
          <div style={{ alignSelf: `end` }}>
            <SectionHeader tagline="explore" headline="Platforms" />
          </div>
          <div>
            <p>
              From aircrafts to balloons, from sensors to plaftorms, it takes a
              lot to understand earth.
            </p>
          </div>
          <div>
            <button
              style={{
                padding: `1rem 5rem`,
                textTransform: `uppercase`,
                color: theme.color.base,
                background: `transparent`,
                border: `1px solid ${theme.color.base}`,
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </section>

      <section style={styles.section} data-cy="instruments-section">
        <SectionHeader tagline="explore" headline="Instruments" />
        <InstrumentsGallery instruments={data.allInstrumentType.nodes} />
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
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
