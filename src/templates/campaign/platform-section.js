import React from "react"
import { graphql } from "gatsby"

import ExploreCard from "../../components/explore-card"

const PlatformSection = ({ platforms }) => (
  <section className="inpage-nav" id="platforms" data-cy="platform-section">
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

export default PlatformSection

export const platforms = graphql`
  fragment platformFragment on platformConnection {
    nodes {
      shortname: short_name
      longname: long_name
    }
  }
`
