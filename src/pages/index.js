import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "../components/image"

const SectionHeader = ({ tagline, headline }) => (
  <>
    <div style={{ textTransform: `uppercase` }}>{tagline}</div>
    <h2>{headline}</h2>
  </>
)

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

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

      <section>
        <SectionHeader
          tagline="explore nasa earth science"
          headline="Focus Areas"
        />
      </section>

      <section>
        <SectionHeader tagline="explore campaigns by" headline="Region Type" />
      </section>

      <section>
        <SectionHeader
          tagline="explore campaigns by"
          headline="Geophysical Concepts"
        />
      </section>

      <section>
        <SectionHeader tagline="explore" headline="Platforms" />
      </section>

      <section>
        <SectionHeader tagline="explore" headline="Platforms" />
      </section>

      <section>
        <SectionHeader tagline="explore" headline="Instruments" />
      </section>
    </Layout>
  )
}

export default IndexPage
