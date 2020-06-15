import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

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
          <div>
            <big>{node.shortname}</big>
            <p>{node.longname}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
)

export const platforms = graphql`
  fragment platformFragment on platformConnection {
    nodes {
      shortname: short_name
      longname: long_name
    }
  }
`

PlatformSection.propTypes = {
  platforms: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        shortname: PropTypes.string.isRequired,
        longname: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
}

export default PlatformSection
