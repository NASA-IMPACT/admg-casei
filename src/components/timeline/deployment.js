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
  hoveredDeployment,
  setHoveredDeployment,
  setSelectedDeployment,
  selectedDeployment,
  regions,
  setTooltip,
  setTooltipContent,
  barHeight = 20,
  eventBarHeight = 4,
  iopHeight = 4,
  showEventTooltip,
  showIopTooltip,
  showDeploymentTooltip,
  setSelectedEvent,
  selectedEvent,
  hoveredEvent,
  setHoveredEvent,
  disableEventSelection,
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
      css={`
        cursor: ${showDeploymentTooltip ? "pointer" : "default"};
      `}
    >
      <g
        className="deployment"
        transform={`translate(${xPosition}, ${yPosition})`}
        onMouseEnter={() => {
          if (showDeploymentTooltip) {
            setHoveredDeployment(id)
            setTooltipContent(<div>{longname}</div>)
          }
        }}
        onMouseLeave={() => {
          setHoveredDeployment(null)
          setTooltipContent(null)
        }}
        onMouseMove={e => {
          if (showDeploymentTooltip) {
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
          }
        }}
      >
        <rect
          width={width}
          height={barHeight}
          fill={colors[NEGATIVE].dataVizOne}
          opacity={
            (selectedDeployment?.id === id && !selectedEvent?.content) ||
            !selectedDeployment?.id
              ? 1
              : hoveredDeployment === id
              ? 0.6
              : 0.3
          }
          transition="all 2s"
          onClick={() => {
            setSelectedDeployment({
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
            })
            setSelectedEvent({ content: null, type: "deployment" })
          }}
        />
      </g>

      <Events
        events={events}
        xScale={xScale}
        yPosition={yPosition + eventOffsetY}
        setTooltipContent={setTooltipContent}
        setTooltip={setTooltip}
        eventBarHeight={eventBarHeight}
        tooltipOffsetY={-5}
        showTooltip={showEventTooltip}
        isParentSelected={
          selectedDeployment?.id === id || !selectedDeployment?.id
        }
        setSelectedEvent={disableEventSelection ? () => {} : setSelectedEvent}
        selectedEvent={selectedEvent}
        hoveredEvent={hoveredEvent}
        setHoveredEvent={setHoveredEvent}
      />
      <Iops
        iops={iops}
        xScale={xScale}
        iopHeight={iopHeight}
        yPosition={yPosition + iopOffsetY}
        setTooltipContent={setTooltipContent}
        setTooltip={setTooltip}
        tooltipOffsetY={-2}
        showTooltip={showIopTooltip}
        isParentSelected={
          selectedDeployment?.id === id || !selectedDeployment?.id
        }
        setSelectedEvent={setSelectedEvent}
        selectedEvent={disableEventSelection ? () => {} : selectedEvent}
        setHoveredDeployment={setHoveredDeployment}
        hoveredDeployment={hoveredDeployment}
        hoveredEvent={hoveredEvent}
        setHoveredEvent={setHoveredEvent}
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
  showEventTooltip: PropTypes.bool,
  showIopTooltip: PropTypes.bool,
  showDeploymentTooltip: PropTypes.bool,
  hoveredDeployment: PropTypes.string,
  setHoveredDeployment: PropTypes.func.isRequired,
  hoveredEvent: PropTypes.string,
  setHoveredEvent: PropTypes.func.isRequired,
  setSelectedEvent: PropTypes.func,
  selectedEvent: PropTypes.object,
  disableEventSelection: PropTypes.boolean,
}
