import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

// Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.

const HamburgerIcon = ({ color = "#FFF", size = "large" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizes[size].width}
    height={sizes[size].height}
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path
      fill={color}
      d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
    />
    <path d="M1,9h14V7H1V9z M1,14h14v-2H1V14z M1,2v2h14V2H1z"></path>
  </svg>
)

HamburgerIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default HamburgerIcon
