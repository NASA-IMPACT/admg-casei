import React from "react"
import PropTypes from "prop-types"

const ChevronIcon = ({ color = "#FFF" }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    role="img"
  >
    <title>Chevron Down</title>
    <rect width="16" height="16" fill="none" />
    <polygon
      fill={color}
      points="12.586,4.586 8,9.172 3.414,4.586 2,6 8,12 14,6"
    />
  </svg>
)

ChevronIcon.propTypes = {
  color: PropTypes.string,
}

export default ChevronIcon
