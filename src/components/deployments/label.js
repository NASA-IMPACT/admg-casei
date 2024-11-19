import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"

import { NEGATIVE, POSITIVE } from "../../utils/constants"
import { colors } from "../../theme"

export const Label = ({ x, y, text, priority }) => {
  const textRef = useRef(null)
  const [{ width, height }, setDimensions] = useState({
    width: 200,
    height: 30,
  })

  useEffect(() => {
    setDimensions({
      width: textRef.current.getBBox().width + 10,
      height: 30,
    })
  }, [textRef.current])

  return (
    <g
      className="label" // used to select in occlusion
      transform={`translate(${x}, ${y})`}
      data-priority={priority}
    >
      <line y2={y} stroke={colors[NEGATIVE].dataVizOne} />
      <rect width={width} height={height} fill={colors[POSITIVE].background} />
      <text
        ref={textRef}
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          textAnchor: "left",
          transform: "translate(5px, 20px)",
        }}
      >
        {text}
      </text>
    </g>
  )
}

Label.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  priority: PropTypes.number.isRequired,
}
