import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

// Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.

const LineIcon = ({ color = "#FFF", size = "large" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizes[size].width}
    height={sizes[size].height}
    viewBox="0 0 448 512"
  >
    <path
      fill={color}
      d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
    />
  </svg>
)

LineIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default LineIcon
