import React from "react"
import PropTypes from "prop-types"

export default function SectionHeader({ tagline, headline, subline, id }) {
  return (
    <div
      css={`
        grid-column: 1 / span 6;
        align-self: end;
      `}
      data-cy={`${id}-section-header`}
    >
      {tagline && (
        <div
          css={`
            text-transform: uppercase;
          `}
          data-cy="section-tagline"
        >
          {tagline}
        </div>
      )}
      <a href={`#${id}`}>
        <h2>{headline}</h2>
      </a>
      {subline && (
        <p
          css={`
            margin-top: -1rem;
          `}
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
