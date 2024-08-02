import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"
const CloseIcon = ({ color = "#FFF", size = "text" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={sizes[size].width}
    height={sizes[size].height}
    viewBox="0 0 16 16"
  >
    <polygon
      fill={color}
      points="13.707,3.707 12.293,2.293 8,6.586 3.707,2.293 2.293,3.707 6.586,8 2.293,12.293 3.707,13.707 8,9.414  12.293,13.707 13.707,12.293 9.414,8"
    />
  </svg>
)

CloseIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}

export default CloseIcon
