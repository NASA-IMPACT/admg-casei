import React from "react"
import PropTypes from "prop-types"

const ExternalLinkIcon = ({ color = "#FFF" }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    role="img"
  >
    <title>External Link</title>
    <rect width="16" height="16" fill="none" />
    <path
      fill={color}
      d="M3,5h4V3H1v12h12V9h-2v4H3V5z M16,8V0L8,0v2h4.587L6.294,8.294l1.413,1.413L14,3.413V8H16z"
    />
  </svg>
)

ExternalLinkIcon.propTypes = {
  color: PropTypes.string,
}

export default ExternalLinkIcon
