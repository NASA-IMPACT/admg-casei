import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

import { Axis } from "./axis"
import { layout } from "../../theme"
import { useChartDimensions } from "../../utils/use-chart-dimensions"
import { occlusion } from "./occlusion"
import { Deployment } from "./deployment"

const chartSettings = {
  marginTop: 1,
  marginRight: 20,
  marginBottom: 40,
  marginLeft: 20,
  paddingX: 20,
}

export const MinorTimeline = ({ deployment }) => {
  if (!deployment) return <div />
  const { start, end, events, id, longname, shortname, aliases } = deployment
  const [containerRef, dms] = useChartDimensions(chartSettings)

  const domain = [new Date(start), new Date(end)]
  const range = [30, dms.boundedWidth - 30]
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
      <div
        css={`
          overflow: hidden;
          position: static;
          isolation: isolate; /* z-index on Details */
        `}
      >
        <svg
          width={range[1] + chartSettings.paddingX * 2}
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
              key={id}
              {...{
                id,
                longname,
                shortname,
                aliases,
                start,
                end,
                events,
                xScale,
                update,
              }}
              yPosition={dms.boundedHeight - 20}
              priority={priority[id] || 0}
              isFocussed={false}
              isAnyFocussed={false}
              updateFocus={() => {}}
              setSelectedDeployment={setSelectedDeployment}
              selectedDeployment={selectedDeployment}
            />

            <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
              <Axis {...{ domain, range, chartSettings, xScale }} />
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
  }),
}
