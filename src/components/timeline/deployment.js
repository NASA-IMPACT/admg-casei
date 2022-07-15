import React, { useMemo } from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { Events } from "./events"
import { Label } from "./label"

export const Deployment = ({
  id,
  longname,
  shortname,
  aliases,
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
      onClick={() => {
        updateFocus(id, xPosition)
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
          text={
            longname ? longname : aliases ? aliases[0].shortname : shortname
          }
          priority={priority}
        />
      )}
    </g>
  )
}

Deployment.propTypes = {
  id: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  aliases: PropTypes.array.isRequired,
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
  collection_periods: PropTypes.array,
  xScale: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  priority: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  isFocussed: PropTypes.bool.isRequired,
  isAnyFocussed: PropTypes.bool.isRequired,
  updateFocus: PropTypes.func.isRequired,
}
