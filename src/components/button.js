import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors, shape } from "../utils/theme"

const Clickable = styled.button`
  &:hover {
    opacity: 0.64;
  }
  &:active {
    transform: translate(0, 1px);
  }
`

export default function Button({ children, action }) {
  return (
    <Clickable
      onClick={action}
      style={{
        userSelect: `none`,
        color: `white`,
        display: `inline-block`,
        textAlign: `center`,
        verticalAlign: `middle`,
        padding: `0.25rem 0.75rem`,
        minWidth: `2rem`,
        background: `none`,
        textShadow: `none`,
        border: 0,
        cursor: `pointer`,
        backgroundColor: colors.lightTheme.linkText,
        borderRadius: shape.rounded,
        fontWeight: `bold`,
      }}
    >
      {children}
    </Clickable>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}

export const IconButton = ({ id, icon, action }) => (
  <Clickable
    type="button"
    onClick={action}
    style={{
      background: "none",
      border: "none",
      flexGrow: 0,
      cursor: `pointer`,
      color: colors.darkTheme.text,
      verticalAlign: `middle`,
      marginLeft: `0.5rem`,
    }}
    data-cy={id}
  >
    <span role="img" aria-label={`${id}-icon`}>
      {icon}
    </span>
  </Clickable>
)

IconButton.propTypes = {
  id: PropTypes.string.isRequired,
  action: PropTypes.func,
  icon: PropTypes.node.isRequired,
}
