import React from "react"
import PropTypes from "prop-types"

const ArrowIcon = ({ color = "#FFF", direction = "right" }) => {
  let rotation, margin
  switch (direction) {
    case "up":
      rotation = {
        transform: "rotate(-90)  translate(-16, 0)",
      }
      break
    case "down":
      rotation = {
        transform: "rotate(90) translate(0, -16)",
      }
      break
    case "left":
      rotation = {
        transform: "rotate(180) translate(-16, -16)",
      }
      margin = "0 0.5rem 0 0"
      break
    case "right":
      rotation = null
      margin = "0 0 0 0.5rem"
      break
    default:
      rotation = null
      margin = 0
      break
  }

  return (
    <svg
      css={`
        margin: ${margin};
      `}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      role="img"
    >
      <title>Arrow {direction}</title>
      <rect width="16" height="16" fill="none" />
      <polygon
        fill={color}
        points="7.586,2.414 12.172,7 0,7 0,9 12.172,9 7.586,13.586 9,15 16,8 9,1"
        {...rotation}
      />
    </svg>
  )
}

ArrowIcon.propTypes = {
  color: PropTypes.string,
  direction: PropTypes.string,
}

export default ArrowIcon
