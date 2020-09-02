import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import theme from "../../utils/theme"

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 1rem;
  margin-top: 9rem;

  /* This invisible border pushes the section below the nav bar when using inpage navigation */
  border-top: 55px solid transparent;
  position: relative;
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;

  /* In case you _really_ need a border, use :before:
   * &:before {
   *   content: "";
   *   position: absolute;
   *   top: -2px;
   *   left: 0;
   *   right: 0;
   *   border-top: 2px solid #ccc;
   * }
  */
`

export const SectionHeader = ({ tagline, headline, to }) => (
  <div style={{ gridColumn: `1 / span 7`, alignSelf: `end` }}>
    {tagline && (
      <div style={{ textTransform: `uppercase` }} data-cy="section-tagline">
        {tagline}
      </div>
    )}
    <a href={to}>
      <h2>{headline}</h2>
    </a>
  </div>
)

SectionHeader.propTypes = {
  tagline: PropTypes.string,
  to: PropTypes.string,
  headline: PropTypes.string.isRequired,
}

export const SectionContent = styled.div`
  grid-column: ${({ columns = [1, 12] }) =>
    `${columns[0]} / span ${columns[1]}`};
  background-color: ${({ withBackground }) =>
    withBackground ? theme.color.secondary : null};
`

SectionContent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.number),
}

export const SectionBlock = ({ id, children }) => {
  return (
    <Section id={id} data-cy={`${id}-section`}>
      {children}
    </Section>
  )
}

SectionBlock.propTypes = {
  id: PropTypes.string.isRequired,
  withText: PropTypes.bool,
  children: PropTypes.node,
}
