import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { SectionBlock, SectionImage } from "../components/section"
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
        tagTitle="Nasa"
        title={data.site.siteMetadata.title}
        description={data.site.siteMetadata.description}
        id="home"
      >
        <Image
          filename="globe.png"
          alt="a globe displaying natural features and slight cloud coverage"
        />
      </Hero>

      <SectionBlock
        tagline="explore nasa earth science"
        headline="Focus Areas"
        id="focus-area"
      >
        <FocusAreaGallery focusAreas={data.allFocusArea.nodes} size="large" />
      </SectionBlock>

      <SectionBlock
        tagline="explore campaigns by"
        headline="Region Type"
        id="region-type"
      >
        <RegionCarousel regions={data.allGeographicalRegion.nodes} />
      </SectionBlock>

      <SectionBlock
        tagline="explore instruments by"
        headline="Geophysical Concepts"
        id="geophysical-concepts"
      >
        <GeophysicsGrid
          geophysicalConcepts={data.allGeophysicalConcept.nodes}
        />
      </SectionBlock>

      <SectionBlock
        tagline="explore"
        headline="Platforms"
        id="platforms"
        withImage={true}
      >
        <SectionImage
          filename="platform.png"
          alt="aircraft flying over ground"
        />

        <div>
          <p>
            From aircrafts to balloons, from sensors to plaftorms, it takes a
            lot to understand earth.
          </p>
        </div>
        <div>
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
      </SectionBlock>

      <SectionBlock tagline="explore" headline="Instruments" id="instruments">
        <InstrumentsGallery instruments={data.allInstrumentType.nodes} />
      </SectionBlock>
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
