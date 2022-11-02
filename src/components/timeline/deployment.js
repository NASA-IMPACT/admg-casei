import React, { useMemo } from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { Events } from "./events"
import { Iops } from "./iops"

export const Deployment = ({
  id,
  longname,
  shortname,
  aliases,
  start,
  end,
  events,
  iops,
  xScale,
  tooltipOffsetY = 0,
  iopOffsetY = -8,
  yPosition,
  eventOffsetY = 0,
  updateFocus,
  setSelectedDeployment,
  selectedDeployment,
  regions,
  setTooltip,
  setTooltipContent,
  barHeight = 14,
  eventBarHeight = 4,
  iopHeight = 4,
}) => {
  const xPosition = useMemo(() => {
    return xScale(new Date(start))
  }, [xScale, start])

  const width = useMemo(() => {
    return xScale(new Date(end)) - xScale(new Date(start))
  }, [xScale, start, end])

  return (
    <g
      key={id + eventOffsetY}
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
                  iops,
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
          height={barHeight}
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
        yPosition={yPosition + eventOffsetY}
        setTooltipContent={setTooltipContent}
        setTooltip={setTooltip}
        eventBarHeight={eventBarHeight}
      />
      <Iops
        iops={iops}
        xScale={xScale}
        iopHeight={iopHeight}
        yPosition={yPosition + iopOffsetY}
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
  iops: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      short_name: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
    })
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
  selectedDeployment: PropTypes.object,
  eventOffsetY: PropTypes.number,
  tooltipOffsetY: PropTypes.number,
  setTooltipContent: PropTypes.func.isRequired,
  barHeight: PropTypes.number,
  iopHeight: PropTypes.number,
  iopOffsetY: PropTypes.number,
  eventBarHeight: PropTypes.number,
}
