import React, { useEffect, useRef, useState } from "react"
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
      const [popupId, setPopupId] = useState(null)
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
      console.log(event)
      return (
        <g
          key={event.id}
          transform={`translate(${eventX1Position}, ${eventYPosition})`}
          css={`
            cursor: default;
          `}
        >
          <rect
            transform={`translate(${-10}, ${-height})`}
            width={width}
            height={height}
            fill={popupId === event.id ? "white" : "none"}
          ></rect>
          <text
            ref={textRef}
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              textAnchor: "left",
              transform: "translate(-5px, -10px)",
              fill:
                popupId === event.id
                  ? colors[NEGATIVE].background
                  : "transparent",
            }}
          >
            {`Event: ${event.shortname}`}
          </text>
          <rect
            onMouseEnter={() => {
              setPopupId(event.id)
            }}
            onMouseLeave={() => {
              setPopupId(null)
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
}
