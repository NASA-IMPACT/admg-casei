import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

export const Iops = ({
  iops,
  xScale,
  yPosition,
  setTooltip,
  setTooltipContent,
  tooltipOffsetY = -90,
  iopHeight = 20,
  showTooltip,
  isParentSelected,
  setSelectedEvent,
  selectedEvent,
  visuallyDeselected,
  hoveredDeployment,
  hoveredEvent,
  setHoveredEvent,
}) => {
  console.log(hoveredDeployment)
  return (
    <>
      {iops.map(iop => {
        const iopStart = new Date(iop.start_date)
        const iopEnd = new Date(iop.end_date)

        const iopX1Position = xScale(iopStart)
        const iopX2Position = xScale(iopEnd)

        const duration = Math.max(iopX2Position - iopX1Position, 5)

        return (
          <g
            key={iop.id + tooltipOffsetY}
            transform={`translate(${iopX1Position}, ${yPosition})`}
            css={`
              cursor: ${showTooltip ? "pointer" : "default"};
              opacity: ${visuallyDeselected ? "0.5" : "1"};
            `}
          >
            <rect
              onMouseEnter={() => {
                setHoveredEvent(iop.id)
                if (showTooltip) {
                  setTooltipContent(
                    <div>
                      <div> {`${iop.short_name}`}</div>
                    </div>
                  )
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
                  ? () => setSelectedEvent({ content: iop, type: "iop" })
                  : () => {}
              }
              width={duration}
              height={iopHeight}
              fill={colors[NEGATIVE].dataVizThree}
              opacity={
                hoveredEvent === iop.id
                  ? 0.6
                  : (isParentSelected && !selectedEvent?.content) ||
                    (isParentSelected && selectedEvent?.content?.id == iop.id)
                  ? 1
                  : 0.3
              }
            />
          </g>
        )
      })}
    </>
  )
}

Iops.propTypes = {
  iops: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      short_name: PropTypes.string.isRequired,
      start_date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      end_date: PropTypes.string.isRequired,
    })
  ),
  iopHeight: PropTypes.number,
  xScale: PropTypes.func.isRequired,
  yPosition: PropTypes.number.isRequired,
  setTooltip: PropTypes.func.isRequired,
  tooltipOffsetY: PropTypes.number,
  setTooltipContent: PropTypes.func.isRequired,
  showTooltip: PropTypes.bool,
  isParentSelected: PropTypes.bool,
  setSelectedEvent: PropTypes.func.isRequired,
  selectedEvent: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.object,
  }),
  visuallyDeselected: PropTypes.bool,
  hoveredDeployment: PropTypes.string,
  hoveredEvent: PropTypes.string,
  setHoveredEvent: PropTypes.func.isRequired,
}
