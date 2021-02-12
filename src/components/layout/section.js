import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors } from "../../utils/theme"

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap: 1rem;
  row-gap: 2rem;
  position: relative;

  margin: ${props => (props.isLight ? `0 -6rem` : 0)};
  padding: ${props => (props.isLight ? `6rem` : 0)};
  margin-bottom: ${props => (props.isSpaced ? `6rem` : `6rem`)};

  background-color: ${props =>
    props.isLight ? colors.lightTheme.background : `none`};
  > *,
  h3 {
    color: ${props =>
      props.isLight ? colors.lightTheme.text : colors.darkTheme.text};
  }
  /* TODO: think about a better approach to the dark vs. light theme switch within a page */
`

/* This invisible border pushes the section below the nav bar when using inpage navigation */
const Buffer = styled.div`
  position: absolute;
  top: -80px;
`

export default function Section({ id, children, isLight, isSpaced = false }) {
  return (
    <Container data-cy={`${id}-section`} isLight={isLight} isSpaced={isSpaced}>
      <Buffer id={id} />
      {children}
    </Container>
  )
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  withText: PropTypes.bool,
  children: PropTypes.node,
  isLight: PropTypes.bool, // adds white background
  isSpaced: PropTypes.bool, // adds large spacing to section - ideal for home page
}

export const SectionContent = styled.div`
  grid-column: ${({ columns = [1, 12] }) =>
    `${columns[0]} / span ${columns[1]}`};
  background-color: ${({ withBackground }) =>
    withBackground ? colors.darkTheme.background : null};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : null)};
`

SectionContent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.number),
}

export const Paragraph = styled.p`
  margin-bottom: 1rem;
`
