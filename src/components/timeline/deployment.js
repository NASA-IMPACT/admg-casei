import React, { useMemo } from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { Events } from "./events"

export const Deployment = ({
  id,
  longname,
  shortname,
  aliases,
  start,
  end,
  events,
  xScale,
  tooltipOffsetY = 0,
  yPosition,
  eventYOffset = 0,
  updateFocus,
  setSelectedDeployment,
  selectedDeployment,
  regions,
  setTooltip,
  setTooltipContent,
}) => {
  const xPosition = useMemo(() => {
    return xScale(new Date(start))
  }, [xScale, start])

  const width = useMemo(() => {
    return xScale(new Date(end)) - xScale(new Date(start))
  }, [xScale, start, end])

  return (
    <g
      key={id}
      onClick={() => {
        updateFocus(id, xPosition)
        setSelectedDeployment(
          selectedDeployment?.id === id
            ? null
            : {
                ...{
                  start,
                  end,
                  events,
                  id,
                  longname,
                  shortname,
                  aliases,
                  regions,
                },
              }
        )
      }}
      css={`
        cursor: pointer;
      `}
    >
      <g
        className="deployment"
        transform={`translate(${xPosition}, ${yPosition})`}
        onMouseEnter={() => {
          setTooltipContent(
            <div>
              <div
                css={`
                  font-weight: bold;
                `}
              >
                Deployment
              </div>
              <div>{shortname}</div>
              <div>{`${start}-${end}`}</div>
              <div>
                {" "}
                {regions?.length === 1
                  ? regions[0].short_name
                  : "multiple regions"}
              </div>
            </div>
          )
        }}
        onMouseLeave={() => {
          setTooltipContent(null)
        }}
        onMouseMove={e => {
          setTooltip({
            x:
              e.clientX -
              e.target.ownerSVGElement.parentElement.getBoundingClientRect().x,
            y:
              e.clientY -
              e.target.ownerSVGElement.parentElement.getBoundingClientRect().y +
              tooltipOffsetY,
          })
        }}
      >
        <rect
          width={width}
          height={20}
          fill={
            selectedDeployment?.id === id || !selectedDeployment?.id
              ? colors[NEGATIVE].dataVizOne
              : colors[NEGATIVE].altText
          }
        />
      </g>

      <Events
        events={events}
        xScale={xScale}
        yPosition={yPosition + eventYOffset}
        setTooltipContent={setTooltipContent}
        setTooltip={setTooltip}
      />
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
  regions: PropTypes.array.isRequired,
  setSelectedDeployment: PropTypes.func.isRequired,
  setTooltip: PropTypes.func.isRequired,
  selectedDeployment: PropTypes.string,
  eventYOffset: PropTypes.number,
  tooltipOffsetY: PropTypes.number,
  setTooltipContent: PropTypes.func.isRequired,
}
