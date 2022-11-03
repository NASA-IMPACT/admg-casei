import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

import { layout } from "../../theme"
import { useChartDimensions } from "../../utils/use-chart-dimensions"
import { occlusion } from "./occlusion"
import { Deployment } from "./deployment"

const chartSettings = {
  marginTop: 1,
  marginRight: 0,
  marginBottom: 40,
  marginLeft: 20,
  paddingX: 0,
}

export const MinorTimeline = ({
  deployment,
  setTooltip,
  setTooltipContent,
}) => {
  if (!deployment) return <div />
  const { start, end, events, iops, id, longname, shortname, aliases } =
    deployment

  const [containerRef, dms] = useChartDimensions(chartSettings)

  const domain = [new Date(start), new Date(end)]
  const range = [0, dms.boundedWidth]
  // maps dates to x-values
  const xScale = d3.scaleUtc().domain(domain).range(range)

  const isFirstRun = useRef(true)
  const [selectedDeployment, setSelectedDeployment] = useState(null)
  const [count, setCount] = useState(1)
  const [priority, setPriority] = useState({})

  useEffect(() => {
    //wait for first render to get correct measures
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    const svg = d3.select(containerRef.current)
    // test  labels for collision
    occlusion(svg)
  }, [containerRef.current, count])

  const update = id => {
    setCount(prev => prev + 1)

    setPriority(prev => ({ ...prev, [id]: count }))
  }

  return (
    <div
      ref={containerRef}
      css={`
        height: 160px;
        max-width: ${layout.maxWidth};
      `}
    >
      <div>
        <svg
          width={range[1] + 20}
          height={dms.height}
          css={`
            position: relative; /* required for zIndex */
            z-index: 2; /* place chart above background */
          `}
        >
          <g
            transform={`translate(${[dms.marginLeft, dms.marginTop].join(
              ","
            )})`}
          >
            <Deployment
              key={id + "minor-timeline"}
              {...{
                id,
                longname,
                shortname,
                aliases,
                start,
                end,
                events,
                iops,
                xScale,
                update,
              }}
              yPosition={dms.boundedHeight}
              priority={priority[id] || 0}
              isFocussed={false}
              isAnyFocussed={false}
              updateFocus={() => {}}
              setSelectedDeployment={setSelectedDeployment}
              selectedDeployment={selectedDeployment}
              eventOffsetY={-30}
              iopOffsetY={-16}
              setTooltip={setTooltip}
              tooltipOffsetY={-114}
              setTooltipContent={setTooltipContent}
              barHeight={2}
              iopHeight={11}
              eventBarHeight={11}
              showEventTooltip={true}
              showIopTooltip={true}
              setHoveredDeployment={() => {}}
            />

            <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
              <g transform={`translate(${38}, 2)`}>
                <text
                  fill="currentColor"
                  style={{
                    fontSize: "14px",
                    textAnchor: "middle",
                    transform: "translateY(15px)",
                  }}
                >
                  {`${d3.utcFormat("%b %d %Y")(domain[0])}`}
                </text>
              </g>
              <g transform={`translate(${xScale(domain[1]) - 38}, 2)`}>
                <text
                  fill="currentColor"
                  style={{
                    fontSize: "14px",
                    textAnchor: "middle",
                    transform: "translateY(15px)",
                  }}
                >
                  {`${d3.utcFormat("%b %d %Y")(domain[1])}`}
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

MinorTimeline.propTypes = {
  deployment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    longname: PropTypes.string.isRequired,
    shortname: PropTypes.string.isRequired,
    aliases: PropTypes.array.isRequired,
    collectionPeriods: PropTypes.array.isRequired,
    regions: PropTypes.array.isRequired,
    campaign: PropTypes.string.isRequired,
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
  }),
  setTooltip: PropTypes.func.isRequired,
  setTooltipContent: PropTypes.func.isRequired,
}
