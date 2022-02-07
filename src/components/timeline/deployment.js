import React, { useMemo } from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { Events } from "./events"
import { Label } from "./label"

export const Deployment = ({
  id,
  shortname,
  start,
  end,
  events,
  xScale,
  update,
  priority,
  yPosition,
  isFocussed,
  isAnyFocussed,
  updateFocus,
}) => {
  const xPosition = useMemo(() => {
    return xScale(new Date(start))
  }, [xScale, start])

  const width = useMemo(() => {
    return xScale(new Date(end)) - xScale(new Date(start))
  }, [xScale, start, end])

  const labelOffset = yPosition - 60

  return (
    <g
      key={id}
      onClick={e => {
        // TODO: use deployment position on page
        // instead of mouse click position
        updateFocus(id, e.pageX, e.pageY)
      }}
      css={`
        cursor: pointer;
      `}
    >
      <g
        className="deployment"
        transform={`translate(${xPosition}, ${yPosition})`}
        onMouseEnter={() => update(id)}
      >
        <rect
          width={width}
          height={20}
          fill={colors[NEGATIVE].dataVizOne}
          stroke={isFocussed ? "white" : "none"}
        />
      </g>

      <Events events={events} xScale={xScale} yPosition={yPosition} />

      {!isAnyFocussed && (
        <Label
          x={xPosition}
          y={labelOffset}
          text={shortname}
          priority={priority}
        />
      )}
    </g>
  )
}

Deployment.propTypes = {
  id: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
    }).isRequired
  ),
  xScale: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  priority: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  isFocussed: PropTypes.bool.isRequired,
  isAnyFocussed: PropTypes.bool.isRequired,
  updateFocus: PropTypes.func.isRequired,
}
