import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import theme from "../../utils/theme"

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 1rem;
  margin-top: ${props => (props.isSpaced ? `6rem` : `2rem`)};
  position: relative;
`

/* This invisible border pushes the section below the nav bar when using inpage navigation */
const Buffer = styled.div`
  position: absolute;
  top: -80px;
`

export default function Section({ id, children, isSpaced = false }) {
  return (
    <Container data-cy={`${id}-section`} isSpaced={isSpaced}>
      <Buffer id={id} />
      {children}
    </Container>
  )
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  withText: PropTypes.bool,
  children: PropTypes.node,
  isSpaced: PropTypes.bool, // adds large spacing to section - ideal for home page
}

export const SectionContent = styled.div`
  grid-column: ${({ columns = [1, 12] }) =>
    `${columns[0]} / span ${columns[1]}`};
  background-color: ${({ withBackground }) =>
    withBackground ? theme.color.secondary : null};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : null)};
`

SectionContent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.number),
}

export const Paragraph = styled.p`
  margin-bottom: 1rem;
`
