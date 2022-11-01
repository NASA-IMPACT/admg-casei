import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

export const Events = ({
  events,
  xScale,
  yPosition,
  setTooltip,
  setTooltipContent,
  tooltipOffsetY,
}) => (
  <>
    {events.map(event => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)

      const eventX1Position = xScale(eventStart)
      const eventX2Position = xScale(eventEnd)

      const duration = Math.max(eventX2Position - eventX1Position, 5)

      return (
        <g
          key={event.id}
          transform={`translate(${eventX1Position}, ${yPosition})`}
          css={`
            cursor: default;
          `}
        >
          <rect
            onMouseEnter={() => {
              setTooltipContent(<div>{`Event: ${event.shortname}`}</div>)
            }}
            onMouseLeave={() => {
              setTooltipContent(null)
            }}
            onMouseMove={e => {
              setTooltip({
                x:
                  e.clientX -
                  e.target.ownerSVGElement.parentElement.getBoundingClientRect()
                    .x,
                y:
                  e.clientY -
                  e.target.ownerSVGElement.parentElement.getBoundingClientRect()
                    .y +
                  tooltipOffsetY,
              })
            }}
            width={duration}
            height={20}
            fill={colors[NEGATIVE].dataVizTwo}
          />
        </g>
      )
    })}
  </>
)

Events.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
    }).isRequired
  ),
  xScale: PropTypes.func.isRequired,
  yPosition: PropTypes.number.isRequired,
  setTooltip: PropTypes.func.isRequired,
  tooltipOffsetY: PropTypes.number,
  setTooltipContent: PropTypes.func.isRequired,
}
