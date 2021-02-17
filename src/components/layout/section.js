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

  margin: ${props => (props.mode === "lightTheme" ? `0 -6rem` : 0)};
  padding: ${props => (props.mode === "lightTheme" ? `6rem` : 0)};
  margin-bottom: ${props => (props.isSpaced ? `6rem` : `6rem`)};

  background-color: ${props =>
    props.mode === "lightTheme" ? colors.lightTheme.background : `none`};
  > *,
  h3 {
    color: ${props => colors[props.mode].text};
  }
`

/* This invisible border pushes the section below the nav bar when using inpage navigation */
const Buffer = styled.div`
  position: absolute;
  top: -80px;
`

export default function Section({
  id,
  children,
  mode = "darkTheme",
  isSpaced = false,
}) {
  return (
    <Container data-cy={`${id}-section`} mode={mode} isSpaced={isSpaced}>
      <Buffer id={id} />
      {children}
    </Container>
  )
}

Section.propTypes = {
  id: PropTypes.string.isRequired,
  withText: PropTypes.bool,
  children: PropTypes.node,
  mode: PropTypes.oneOf(["lightTheme", "darkTheme"]),
  isSpaced: PropTypes.bool, // adds large spacing to section - ideal for home page
}

export const SectionContent = styled.div`
  grid-column: ${({ columns = [1, 12] }) =>
    `${columns[0]} / span ${columns[1]}`};
  background-color: ${({ withBackground, mode }) =>
    withBackground ? colors[mode].background : null};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : null)};
  padding: ${({ withPadding }) => (withPadding ? `5rem` : null)};

  > *,
  h3 {
    color: ${props => colors[props.mode].text};
  }
`

SectionContent.defaultProps = {
  mode: "darkTheme",
}

SectionContent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.number),
  minHeight: PropTypes.string,
  mode: PropTypes.oneOf(["darkTheme", "lightTheme"]),
  withBackground: PropTypes.bool,
  withPadding: PropTypes.bool,
}

export const Paragraph = styled.p`
  margin-bottom: 1rem;
`
