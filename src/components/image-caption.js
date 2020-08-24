import React from "react"
import PropTypes from "prop-types"

export default function ImageCaption({ children, id }) {
  return (
    <label
      style={{
        position: `absolute`,
        bottom: `.5rem`,
        left: `1rem`,
        maxWidth: `18rem`,
        textShadow: `1px 1px rgba(0,0,0,0.8)`,
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
