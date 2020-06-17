import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import {
  AirborneInsitu,
  GroundInstruments,
  AirborneRemoteSensors,
  ExperimentalInstruments,
  OceanInstruments,
  FacilityInstruments,
} from "../components/icons"
import { FocusAreaGallery } from "../components/home/focus-area-gallery"
import { RegionCarousel } from "../components/home/region-carousel"
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

const Instrument = ({ id, caption }) => {
  // TODO: This mapping is more or less random
  // we don't have icons for the existing instrument types.
  const icons = {
    "In Situ - Magnetic/Electric": <AirborneInsitu />,
    "In Situ - Spectrometer/Radiometer": <GroundInstruments />,
    Remote: <AirborneRemoteSensors />,
    "Solar/Space": <ExperimentalInstruments />,
    NID: <OceanInstruments />,
    "Data Analyses": <FacilityInstruments />,
  }

  if (!icons[id]) return null

  return (
    <div
      className="placeholder"
      style={{ textAlign: `center` }}
      data-cy="instrument"
    >
      {icons[id]}
      <div>{caption}</div>
    </div>
  )
}

Instrument.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}

const styles = {
  section: { marginTop: `8rem` },
}

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />

      <div style={{ display: `grid`, gridTemplateColumns: `1fr 1fr` }}>
        <div style={{ alignSelf: `end` }}>
          <div style={{ textTransform: `uppercase` }}>NASA</div>
          <h1>{data.site.siteMetadata.title}</h1>
        </div>
        <div style={{ alignSelf: `start` }}>
          <p>
            Explore NASA’s catalog of airborne, <br /> field stationary and
            fixed campaigns.
          </p>
        </div>
        <div style={{ gridArea: `1 / 2 / 3 / 3` }}>
          <Image
            filename="globe.png"
            alt="a globe displaying natural features and slight cloud coverage"
          />
        </div>
      </div>

      <section style={styles.section} data-cy="focus-area-section">
        <SectionHeader
          tagline="explore nasa earth science"
          headline="Focus Areas"
        />
        <FocusAreaGallery focusAreas={data.allFocusArea.nodes} />
      </section>

      <section style={styles.section} data-cy="region-type-section">
        <SectionHeader tagline="explore campaigns by" headline="Region Type" />
        <RegionCarousel regions={data.allGeographicalRegion.nodes} />
      </section>

      <section style={styles.section} data-cy="geophysical-concepts-section">
        <SectionHeader
          tagline="explore campaigns by"
          headline="Geophysical Concepts"
        />
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            border: `1px solid ${theme.color.base}`,
          }}
        >
          {data.allGeophysicalConcept.nodes.map(concept => (
            <div
              key={concept.id}
              style={{
                border: `1px solid ${theme.color.base}`,
                padding: `1rem`,
                flexGrow: 1,
                textAlign: `center`,
              }}
            >
              {concept.shortname}
            </div>
          ))}
        </div>
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
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fill, minmax(min(120px, 100%), 1fr))`,
            gap: `1rem`,
          }}
        >
          {data.allInstrumentType.nodes.map(instrument => (
            <Instrument
              key={instrument.id}
              id={instrument.shortname}
              caption={instrument.longname}
            />
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
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
