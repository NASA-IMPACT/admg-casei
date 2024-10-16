import React from "react"
import PropTypes from "prop-types"

const TrashIcon = ({ color = "#FFF" }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <rect width="16px" height="16px" fill="none" />
    <path
      fill={color}
      d="M11,5h2v8.5c0,0.825-0.675,1.5-1.5,1.5h-7C3.675,15,3,14.325,3,13.5V5h2v8h2V5h2v8h2V5z M2,2h12v2H2V2z M6,0h4v1H6V0z"
    />
  </svg>
)

TrashIcon.propTypes = {
  color: PropTypes.string,
}

export default TrashIcon
