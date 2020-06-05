import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"
import {
  AtmosphericCompositionIcon,
  AtmosphericDynamicsIcon,
  CarbonCycleEcosystemsIcon,
  ClimateVariabilityChangeIcon,
  EarthSurfaceInteriorIcon,
  GlobalWaterEnergyCycleIcon,
  WeatherIcon,
} from "../components/icons"
import { RegionCarousel } from "../components/home/region-carousel"

const SectionHeader = ({ tagline, headline }) => (
  <div>
    <div style={{ textTransform: `uppercase` }}>{tagline}</div>
    <h2>{headline}</h2>
  </div>
)

const FocusArea = ({ id, caption }) => {
  // TODO: This mapping is currently done by shortname, as I don't trust
  // the id yet to be stable.
  const icons = {
    "Atmospheric Composition": <AtmosphericCompositionIcon />,
    "Atmospheric Dynamics": <AtmosphericDynamicsIcon />,
    "Carbon Cycle & Ecosystems": <CarbonCycleEcosystemsIcon />,
    "Climate Variability & Change": <ClimateVariabilityChangeIcon />,
    "Earth Surface & Interior": <EarthSurfaceInteriorIcon />,
    "Global Water & Energy Cycle": <GlobalWaterEnergyCycleIcon />,
    Weather: <WeatherIcon />,
  }

  if (!icons[id]) return null

  return (
    <div style={{ textAlign: `center` }} data-cy="focus-area">
      {icons[id]}
      <div>{caption}</div>
    </div>
  )
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
            alt={`a globe displaying natural features and slight cloud coverage`}
          />
        </div>
      </div>

      <section style={{ marginTop: `8rem` }} data-cy="focus-area-section">
        <SectionHeader
          tagline="explore nasa earth science"
          headline="Focus Areas"
        />
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fill, minmax(min(120px, 100%), 1fr))`,
            gap: `1rem`,
          }}
        >
          {data.allFocusArea.nodes.map(f => (
            <FocusArea key={f.id} id={f.shortname} caption={f.shortname} />
          ))}
        </div>
      </section>

      <section style={{ marginTop: `8rem` }} data-cy="region-type-section">
        <SectionHeader tagline="explore campaigns by" headline="Region Type" />
        <RegionCarousel regions={data.allGeographicalRegion.nodes} />
      </section>

      <section
        style={{ marginTop: `8rem` }}
        data-cy="geophysical-concepts-section"
      >
        <SectionHeader
          tagline="explore campaigns by"
          headline="Geophysical Concepts"
        />
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
          }}
        >
          {data.allGeophysicalConcept.nodes.map(concept => (
            <div
              key={concept.id}
              style={{
                border: `1px solid white`,
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

      <section style={{ marginTop: `8rem` }} data-cy="platforms-section">
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `1fr 1fr`,
            columnGap: `5rem`,
          }}
        >
          <div style={{ gridArea: `1 / 1 / 4 / 2` }}>
            <Image
              filename="platform.png"
              alt={`aircraft flying over ground`}
            />
          </div>
          <div style={{ alignSelf: `end` }}>
            <SectionHeader tagline="explore" headline="Platforms" />{" "}
          </div>
          <div>
            <p>
              From aircrafts to balloons, from sensors to plaftorms, it takes a
              lot to understand earth.
            </p>
          </div>
          <div>
            <button>Explore</button>
          </div>
        </div>
      </section>

      <section style={{ marginTop: `8rem` }}>
        <SectionHeader tagline="explore" headline="Instruments" />
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
  }
`
export default IndexPage
