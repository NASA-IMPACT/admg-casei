import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import theme from "../../utils/theme"

const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 1rem;
  margin-top: ${props => (props.isSpaced ? `4rem` : `1rem`)};
  position: relative;

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

/* This invisible border pushes the section below the nav bar when using inpage navigation */
const Buffer = styled.div`
  position: absolute;
  top: -80px;
`

export const SectionHeader = ({ tagline, headline, id, isPrimary }) => (
  <div style={{ gridColumn: `1 / span 7`, alignSelf: `end` }}>
    {tagline && (
      <div style={{ textTransform: `uppercase` }} data-cy="section-tagline">
        {tagline}
      </div>
    )}
    <a href={`#${id}`}>
      {isPrimary ? <h1>{headline}</h1> : <h2>{headline}</h2>}
    </a>
  </div>
)

SectionHeader.propTypes = {
  tagline: PropTypes.string,
  id: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
}

SectionHeader.defaultProps = {
  isPrimary: false,
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

export const SectionBlock = ({ id, children, isSpaced }) => {
  return (
    <Section data-cy={`${id}-section`} isSpaced={isSpaced}>
      <Buffer id={id} />
      {children}
    </Section>
  )
}

SectionBlock.propTypes = {
  id: PropTypes.string.isRequired,
  withText: PropTypes.bool,
  children: PropTypes.node,
  isSpaced: PropTypes.bool, // adds large spacing to section - ideal for home page
}

SectionBlock.defaultProps = {
  isSpaced: false,
}
