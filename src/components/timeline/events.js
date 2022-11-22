import React from "react"
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
  eventBarHeight,
  showTooltip,
  isParentSelected,
  setSelectedEvent,
  selectedEvent,
  hoveredEvent,
  setHoveredEvent,
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
              setHoveredEvent(event.id)
              if (showTooltip) {
                setTooltipContent(<div> {`${event.shortname}`}</div>)
              }
            }}
            onMouseLeave={() => {
              setHoveredEvent(null)
              setTooltipContent(null)
            }}
            onMouseMove={e => {
              if (showTooltip) {
                setTooltip({
                  x:
                    e.clientX -
                    e.target.ownerSVGElement.parentElement.getBoundingClientRect()
                      .x,
                  y:
                    e.clientY -
                    e.target.ownerSVGElement.parentElement.getBoundingClientRect()
                      .y +
                    114,
                })
              }
            }}
            onClick={
              setSelectedEvent
                ? () => setSelectedEvent({ content: event, type: "event" })
                : () => {}
            }
            width={duration}
            height={eventBarHeight}
            fill={colors[NEGATIVE].dataVizTwo}
            opacity={
              (isParentSelected && !selectedEvent?.content) ||
              (isParentSelected && selectedEvent?.content?.id == event.id)
                ? 1
                : hoveredEvent === event.id
                ? 0.6
                : 0.5
            }
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
  setSelectedEvent: PropTypes.func,
  selectedEvent: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.object,
  }),
  hoveredEvent: PropTypes.string,
  setHoveredEvent: PropTypes.func.isRequired,
}
