import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"
// import { differenceInHours } from "date-fns"

import { Axis } from "./axis"
import { NEGATIVE } from "../../utils/constants"
import { colors, layout } from "../../theme"
import { useChartDimensions } from "../../utils/use-chart-dimensions"
import { occlusion } from "./occlusion"
import { Deployment } from "./deployment"
import { ScrollShadow } from "./scroll-shadow"
import { Details } from "./details"
import { Disclosure } from "@reach/disclosure"
import { DeploymentPanel } from "./deployment-panel"

const chartSettings = {
  marginTop: 1,
  marginRight: 20,
  marginBottom: 40,
  marginLeft: 20,
  paddingX: 20,
}

export const TimelineChart = ({ deployments }) => {
  const [containerRef, dms] = useChartDimensions(chartSettings)

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
  // const extend = Math.max(
  //   differenceInHours(maxDate, minDate) / 4,
  //   dms.boundedWidth
  // )
  const range = [0, dms.boundedWidth]
  // maps dates to x-values
  const xScale = d3.scaleUtc().domain(domain).range(range)

  const isFirstRun = useRef(true)
  const [selectedDeployment, setSelectedDeployment] = useState(null)
  const [count, setCount] = useState(1)
  const [priority, setPriority] = useState({})
  const [focussedDeployment, setFocussedDeployment] = useState(null)
  const [xPosition, setXPosition] = useState(null)

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

  const updateFocus = (id, xPosition) => {
    setFocussedDeployment(id)
    setXPosition(xPosition)
  }

  const scrollRef = useRef()

  return (
    <Disclosure open={!!selectedDeployment}>
      <div
        ref={containerRef}
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
          css={`
            position: absolute;
            z-index: 1;
          `}
        >
          <rect
            width={dms.boundedWidth + chartSettings.paddingX * 2}
            height={dms.boundedHeight}
            fill={colors[NEGATIVE].background}
          />
        </svg>
        <ScrollShadow scrollRef={scrollRef}>
          <div
            ref={scrollRef}
            css={`
              overflow: hidden;
              position: static;
              isolation: isolate; /* z-index on Details */
            `}
          >
            <svg // scrollable chart
              className="scrollable"
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
                {deployments.map(
                  ({
                    start,
                    end,
                    events,
                    id,
                    longname,
                    shortname,
                    aliases,
                    regions,
                  }) => (
                    <Deployment
                      key={id}
                      {...{
                        id,
                        regions,
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
                      isFocussed={focussedDeployment === id}
                      isAnyFocussed={!!focussedDeployment}
                      updateFocus={updateFocus}
                      setSelectedDeployment={setSelectedDeployment}
                      selectedDeployment={selectedDeployment}
                    />
                  )
                )}

                <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
                  <Axis {...{ domain, range, chartSettings, xScale }} />
                </g>
              </g>
            </svg>
          </div>
        </ScrollShadow>
      </div>
      <DeploymentPanel
        selectedDeployment={selectedDeployment}
      ></DeploymentPanel>
    </Disclosure>
  )
}

TimelineChart.propTypes = {
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
}
