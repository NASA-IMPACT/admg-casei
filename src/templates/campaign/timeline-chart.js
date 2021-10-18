import React, { useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { useChartDimensions } from "../../utils/use-chart-dimensions"
import * as d3 from "d3"

import { Axis } from "./axis"
import { NEGATIVE, POSITIVE } from "../../utils/constants"
import { colors } from "../../theme"

const chartSettings = {
  marginTop: 1,
  marginRight: 160,
  marginBottom: 40,
  marginLeft: 20,
  paddingX: 20,
}

export const TimelineChart = ({ deployments }) => {
  const [ref, dms] = useChartDimensions(chartSettings)

  const minDate = new Date(d3.min(deployments.map(({ start }) => start)))
  const maxDate = new Date(d3.max(deployments.map(({ end }) => end)))

  // maps dates to x-values
  const xScale = useMemo(
    () => d3.scaleUtc().domain([minDate, maxDate]).range([0, dms.boundedWidth]),
    [dms.boundedWidth]
  )

  useEffect(() => {
    // test  labels for collision
  }, [])

  let previousRightEnd = 0

  return (
    <div ref={ref} style={{ height: "200px" }}>
      <svg width={dms.width} height={dms.height}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(",")})`}
        >
          <rect //background
            transform={`translate(${[-chartSettings.paddingX, 0].join(",")})`}
            width={dms.boundedWidth + chartSettings.paddingX * 2}
            height={dms.boundedHeight}
            fill={colors[NEGATIVE].background}
          />

          {deployments.map(({ start, end, events, id, shortname }) => {
            const xPosition = xScale(new Date(start))
            const yPosition = dms.boundedHeight - 20
            const width = xScale(new Date(end)) - xScale(new Date(start))
            const labelWidth = shortname.length * 10
            const labelHeight = 30
            const labelOffset =
              xPosition < previousRightEnd ? yPosition - 100 : yPosition - 60

            previousRightEnd = xPosition + labelWidth

            return (
              <g key={id}>
                <g transform={`translate(${xPosition}, ${yPosition})`}>
                  <rect
                    width={width}
                    height={20}
                    fill={colors[NEGATIVE].dataVizOne}
                  />
                </g>

                {events.map(event => {
                  const eventStart = new Date(event.start)
                  const eventEnd = new Date(event.end)
                  eventEnd.setUTCHours(23, 59, 59, 999)

                  const eventXPosition = xScale(eventStart)
                  const eventYPosition = yPosition - 20

                  const eventWidth = xScale(eventEnd) - xScale(eventStart)

                  return (
                    <g
                      key={event.id}
                      transform={`translate(${eventXPosition}, ${eventYPosition})`}
                    >
                      <rect
                        width={eventWidth - 1}
                        height={20}
                        fill={colors[NEGATIVE].dataVizTwo}
                      />
                    </g>
                  )
                })}

                <g transform={`translate(${xPosition}, ${labelOffset})`}>
                  <line
                    y2={dms.boundedHeight - labelOffset}
                    stroke={colors[NEGATIVE].dataVizOne}
                  />
                  <rect
                    width={labelWidth}
                    height={labelHeight}
                    fill={colors[POSITIVE].background}
                  />
                  <text
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      textAnchor: "left",
                      transform: "translate(5px, 20px)",
                    }}
                  >
                    {shortname}
                  </text>
                </g>
              </g>
            )
          })}

          <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
            <Axis
              domain={[minDate, maxDate]}
              range={[0, dms.boundedWidth]}
              chartSettings={chartSettings}
            />
          </g>
        </g>
      </svg>
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
    })
  ),
}
