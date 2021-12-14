import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"
import { differenceInHours } from "date-fns"

import { Axis } from "./axis"
import { NEGATIVE } from "../../utils/constants"
import { colors, layout } from "../../theme"
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

export const TimelineChart = ({ deployments }) => {
  const [ref, dms] = useChartDimensions(chartSettings)

  const minDate = new Date(
    d3.min(
      deployments.map(({ start, events }) =>
        d3.min([start, ...events.map(({ start }) => start)])
      )
    )
  )
  const maxDate = new Date(
    d3.max(
      deployments.map(({ end, events }) =>
        d3.max([end, ...events.map(({ end }) => end)])
      )
    )
  )
  const domain = [minDate, maxDate]
  const extend = Math.max(
    differenceInHours(maxDate, minDate) / 4,
    dms.boundedWidth
  )
  const range = [0, extend]
  // maps dates to x-values
  const xScale = d3.scaleUtc().domain(domain).range(range)

  const isFirstRun = useRef(true)
  const [count, setCount] = useState(1)
  const [priority, setPriority] = useState({})

  useEffect(() => {
    //wait for first render to get correct measures
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }

    const svg = d3.select(ref.current)
    // test  labels for collision
    occlusion(svg)
  }, [ref.current, count])

  const update = id => {
    setCount(prev => prev + 1)

    setPriority(prev => ({ ...prev, [id]: count }))
  }

  return (
    <div
      ref={ref}
      css={`
        height: 200px;
        max-width: ${layout.maxWidth};
        isolation: isolate;

        & .occluded {
          /* hide occluded labels */
          display: none;
        }
      `}
    >
      <svg // background
        width={dms.width}
        height={dms.height}
        style={{ position: "absolute", zIndex: 1 }}
      >
        <rect
          width={dms.boundedWidth + chartSettings.paddingX * 2}
          height={dms.boundedHeight}
          fill={colors[NEGATIVE].background}
        />
      </svg>
      <div
        style={{
          overflow: "hidden",
          overflowX: "scroll",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <svg // scrollable chart
          className="scrollable"
          width={range[1] + chartSettings.paddingX * 2}
          height={dms.height}
          style={{
            position: "relative", // required for zIndex
            zIndex: 2, // place chart above background
          }}
        >
          <g
            transform={`translate(${[dms.marginLeft, dms.marginTop].join(
              ","
            )})`}
          >
            {deployments.map(({ start, end, events, id, shortname }) => (
              <Deployment
                key={id}
                {...{
                  id,
                  shortname,
                  start,
                  end,
                  events,
                  xScale,
                  update,
                }}
                yPosition={dms.boundedHeight - 20}
                priority={priority[id] || 0}
              />
            ))}

            <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
              <Axis {...{ domain, range, chartSettings }} />
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}

TimelineChart.propTypes = {
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      collectionPeriods: PropTypes.array.isRequired,
      regions: PropTypes.array.isRequired,
      campaign: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
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
    })
  ),
}
