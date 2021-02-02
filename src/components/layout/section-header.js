import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import {
  SmallTitle,
  LinkText,
  Heading2,
  clickableStyle,
} from "../../theme/typography"

const InpageLinkHeading2 = styled(Heading2)`
  ${clickableStyle};
`

export default function SectionHeader({ tagline, headline, id }) {
  return (
    <div style={{ gridColumn: `1 / span 7`, alignSelf: `end` }}>
      {tagline && <SmallTitle data-cy="section-tagline">{tagline}</SmallTitle>}
      {headline && (
        <LinkText href={`#${id}`}>
          <InpageLinkHeading2>{headline}</InpageLinkHeading2>
        </LinkText>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  tagline: PropTypes.string,
  id: PropTypes.string.isRequired,
  headline: PropTypes.string,
}
