import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

// Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.

const LineIcon = ({ color = "#FFF", size = "large" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizes[size].width}
    height={sizes[size].height}
    viewBox="0 0 640 512"
  >
    <path
      fill={color}
      d="M5.1 9.2C13.3-1.2 28.4-3.1 38.8 5.1l592 464c10.4 8.2 12.3 23.3 4.1 33.7s-23.3 12.3-33.7 4.1L9.2 42.9C-1.2 34.7-3.1 19.6 5.1 9.2z"
    />
  </svg>
)

LineIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default LineIcon
