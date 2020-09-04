import React from "react"
import PropTypes from "prop-types"

import theme from "../utils/theme"

export default function Button({ children, action }) {
  return (
    <button
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
        backgroundColor: theme.color.tertiary,
        borderRadius: theme.shape.rounded,
        fontWeight: `bold`,
      }}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}
