import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

const FilterIcon = ({ color = "#FFF", size = "text" }) => (
  <svg
    width={sizes[size].width}
    height={sizes[size].height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    role="img"
  >
    <title>Filter</title>
    <rect width={sizes[size].width} height={sizes[size].height} fill="none" />
    <path fill={color} d="M7,16L7,10L0,2L0,0L16,0L16,2L9,10L9,14L7,16Z" />
  </svg>
)

FilterIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default FilterIcon
