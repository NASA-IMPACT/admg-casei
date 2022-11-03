import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { reformatDate } from "../../utils/helpers"

export const Iops = ({
  iops,
  xScale,
  yPosition,
  setTooltip,
  setTooltipContent,
  tooltipOffsetY = -90,
  iopHeight = 12,
  showTooltip,
  isParentSelected,
}) => (
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
                      IOP
                    </div>
                    <div> {`${iop.short_name}`}</div>
                    <div>{`${reformatDate(iop.start_date)}-${reformatDate(
                      iop.end_date
                    )}`}</div>
                    <div> {`${iop.description}`}</div>
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
            height={iopHeight}
            fill={colors[NEGATIVE].dataVizThree}
            opacity={isParentSelected ? 1 : 0.3}
          />
        </g>
      )
    })}
  </>
)

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
}
