import React from "react"
import PropTypes from "prop-types"

export default function Tag({ tagName }) {
  return (
    <div
      style={{
        textTransform: `uppercase`,
        border: `1px solid`,
        padding: `0.25rem`,
      }}
      data-cy="ongoing-tag"
    >
      {tagName}
    </div>
  )
}

Tag.propTypes = {
  tagName: PropTypes.string,
}
