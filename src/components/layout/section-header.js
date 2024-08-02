import React from "react"
import PropTypes from "prop-types"
import { breakpoints } from "../../theme"
export default function SectionHeader({
  tagline,
  headline,
  description,
  id,
  subtitle,
  spanWidth = 6,
}) {
  return (
    <div
      css={`
        grid-column: 1 / -1;
        align-self: end;
        @media screen and (min-width: ${breakpoints["sm"]}) {
          grid-column: 1 / span ${spanWidth};
        }
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
      {subtitle && <div>{subtitle}</div>}
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
  subtitle: PropTypes.string,
}
