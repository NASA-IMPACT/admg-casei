import React from "react"
import PropTypes from "prop-types"

export default function ImageCaption({ children, id }) {
  return (
    <label
      style={{
        position: `absolute`,
        top: `16rem`,
        left: `1.5rem`,
        maxWidth: `24rem`,
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
