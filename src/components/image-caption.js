import React from "react"
import PropTypes from "prop-types"

import theme from "../utils/theme"

export default function ImageCaption({ children, id }) {
  return (
    <label
      style={{
        textTransform: `uppercase`,
        color: theme.color.base,
        textShadow: `1px 1px rgba(0,0,0,0.8)`,
        position: `absolute`,
        bottom: `1rem`,
        left: `1rem`,
        fontWeight: `bold`,
      }}
      data-cy={`${id}-caption`}
    >
      {children}
    </label>
  )
}

ImageCaption.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
