import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { reformatDate } from "../../utils/helpers"

export const Events = ({
  events,
  xScale,
  yPosition,
  setTooltip,
  setTooltipContent,
  tooltipOffsetY,
  eventBarHeight,
  showTooltip,
  isParentSelected,
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
          key={event.id + tooltipOffsetY}
          transform={`translate(${eventX1Position}, ${yPosition})`}
          css={`
            cursor: ${showTooltip ? "pointer" : "default"};
          `}
        >
          <rect
            onMouseEnter={() => {
              if (showTooltip) {
                setTooltipContent(
                  <div>
                    <div
                      css={`
                        font-weight: bold;
                      `}
                    >
                      Event
                    </div>
                    <div> {`${event.shortname}`}</div>
                    <div>{`${reformatDate(event.start)}-${reformatDate(
                      event.end
                    )}`}</div>
                    <div> {`${event.description}`}</div>
                  </div>
                )
              }
            }}
            onMouseLeave={() => {
              setTooltipContent(null)
            }}
            onMouseMove={e => {
              if (showTooltip) {
                setTooltip({
                  x:
                    e.clientX -
                    e.target.ownerSVGElement.parentElement.getBoundingClientRect()
                      .x -
                    32,
                  y:
                    e.clientY -
                    e.target.ownerSVGElement.parentElement.getBoundingClientRect()
                      .y +
                    114,
                })
              }
            }}
            width={duration}
            height={eventBarHeight}
            fill={colors[NEGATIVE].dataVizTwo}
            opacity={isParentSelected ? 1 : 0.3}
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
  eventBarHeight: PropTypes.number.isRequired,
  xScale: PropTypes.func.isRequired,
  yPosition: PropTypes.number.isRequired,
  setTooltip: PropTypes.func.isRequired,
  tooltipOffsetY: PropTypes.number,
  setTooltipContent: PropTypes.func.isRequired,
  showTooltip: PropTypes.bool,
  isParentSelected: PropTypes.bool,
}
