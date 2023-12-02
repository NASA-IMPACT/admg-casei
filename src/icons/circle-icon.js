import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

// Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.

const CircleIcon = ({ color = "#FFF" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 512 512"
  >
    <path fill={color} d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
  </svg>
)

CircleIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default CircleIcon
