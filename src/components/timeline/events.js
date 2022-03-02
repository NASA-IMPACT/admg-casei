import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

export const Events = ({ events, xScale, yPosition }) => (
  <>
    {events.map(event => {
      const eventStart = new Date(event.start)
      const eventEnd = new Date(event.end)

      const eventX1Position = xScale(eventStart)
      const eventX2Position = xScale(eventEnd)
      const eventYPosition = yPosition - 20

      const duration = Math.max(eventX2Position - eventX1Position, 5)
      // should be minimum 5 to be visible

      return (
        <g
          key={event.id}
          transform={`translate(${eventX1Position}, ${eventYPosition})`}
          css={`
            cursor: default;
          `}
        >
          <rect
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
}
