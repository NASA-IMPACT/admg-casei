import React from "react"
import PropTypes from "prop-types"

export default function SectionHeader({
  tagline,
  headline,
  description,
  id,
  spanWidth = 6,
}) {
  return (
    <div
      css={`
        grid-column: 1 / span ${spanWidth};
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
      <div>Select a deployment to see details</div>
      {description && (
        <p
          css={`
            margin-top: -1rem;
          `}
          data-cy="section-description"
        >
          {description}
        </p>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  tagline: PropTypes.string,
  headline: PropTypes.string.isRequired,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  spanWidth: PropTypes.number,
}
