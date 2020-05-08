import React from "react"
import { graphql } from "gatsby"

import ExploreCard from "../../components/explore-card"

const PlatformsSection = ({ platforms }) => (
  <section id="platforms" data-cy="platforms-section">
    <h2>Platforms & Instruments</h2>
    <div
      style={{
        display: `grid`,
        gap: `0.5rem`,
        gridTemplateColumns: ` 1fr 1fr 1fr 1fr`,
      }}
    >
      {platforms.nodes.map(node => (
        <div key={node.shortname} data-cy="platform">
          <ExploreCard title={node.shortname} description={node.longname} />
        </div>
      ))}
    </div>
  </section>
)

export default PlatformsSection

export const platforms = graphql`
  fragment platformFragment on PlatformCsvConnection {
    nodes {
      shortname: ADMG_s_Platform_Shortname
      longname: ADMG_s_Platform_Longname
    }
  }
`
