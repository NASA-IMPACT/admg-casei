import React from "react"
import PropTypes from "prop-types"

export default function SectionHeader({ tagline, headline, subline, id }) {
  return (
    <div style={{ gridColumn: `1 / span 7`, alignSelf: `end` }}>
      {tagline && (
        <div style={{ textTransform: `uppercase` }} data-cy="section-tagline">
          {tagline}
        </div>
      )}
      <a href={`#${id}`}>
        <h2>{headline}</h2>
      </a>
      {subline && (
        <p
          style={{ marginTop: `-2rem`, marginBottom: `2.5rem` }}
          data-cy="section-subline"
        >
          {subline}
        </p>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  tagline: PropTypes.string,
  headline: PropTypes.string.isRequired,
  subline: PropTypes.string,
  id: PropTypes.string.isRequired,
}
