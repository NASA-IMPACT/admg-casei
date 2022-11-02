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
  tooltipOffsetY,
  iopHeight = 12,
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
            cursor: default;
          `}
        >
          <rect
            onMouseEnter={() => {
              setTooltipContent(<div>{`IOP: ${iop.short_name}`}</div>)
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
            height={iopHeight}
            fill={colors[NEGATIVE].dataVizThree}
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
}
