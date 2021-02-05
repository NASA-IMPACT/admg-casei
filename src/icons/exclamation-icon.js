import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

const ExclamationIcon = ({ color = "#FFF", size = "text" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizes[size].width}
    height={sizes[size].height}
    viewBox="0 0 16 16"
  >
    <g fill={color} fillRule="nonzero">
      <path d="M8 0C3.578 0 0 3.578 0 8c0 4.422 3.578 8 8 8 4.422 0 8-3.578 8-8 0-4.422-3.578-8-8-8zm0 14.75A6.746 6.746 0 011.25 8c0-3.731 3.02-6.75 6.75-6.75 3.731 0 6.75 3.02 6.75 6.75 0 3.731-3.02 6.75-6.75 6.75z" />
      <path d="M8 4.027a.625.625 0 00-.625.625v4.025a.625.625 0 101.25 0V4.652A.625.625 0 008 4.027z" />
      <circle cx="8" cy="10.911" r="1" />
    </g>
  </svg>
)

ExclamationIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default ExclamationIcon
