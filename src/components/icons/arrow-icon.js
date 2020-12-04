import React from "react"
import PropTypes from "prop-types"

const ArrowIcon = ({ color = "#FFF" }) => (
  <svg
    style={{ marginLeft: `.5rem` }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-labelledby="rightArrowId"
    role="img"
  >
    <title id="rightArrowId">Arrow Right</title>
    <rect width="16" height="16" id="icon-bound" fill="none" />
    <polygon
      fill={color}
      points="7.586,2.414 12.172,7 0,7 0,9 12.172,9 7.586,13.586 9,15 16,8 9,1"
    />
  </svg>
)

ArrowIcon.propTypes = {
  color: PropTypes.string,
}

export default ArrowIcon
