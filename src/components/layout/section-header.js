import React from "react"
import PropTypes from "prop-types"

import { Heading1, Heading2 } from "../../theme/typography"

export default function SectionHeader({ tagline, headline, id, isPrimary }) {
  return (
    <div style={{ gridColumn: `1 / span 7`, alignSelf: `end` }}>
      {tagline && (
        <div style={{ textTransform: `uppercase` }} data-cy="section-tagline">
          {tagline}
        </div>
      )}
      {headline && (
        <a href={`#${id}`}>
          {isPrimary ? (
            <Heading1>{headline}</Heading1>
          ) : (
            <Heading2>{headline}</Heading2>
          )}
        </a>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  tagline: PropTypes.string,
  id: PropTypes.string.isRequired,
  headline: PropTypes.string,
  isPrimary: PropTypes.bool,
}

SectionHeader.defaultProps = {
  isPrimary: false,
}
