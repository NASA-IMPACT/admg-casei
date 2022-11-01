import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"
import styled from "styled-components"

import { Axis } from "./axis"
import { NEGATIVE, POSITIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { useChartDimensions } from "../../utils/use-chart-dimensions"
import { occlusion } from "./occlusion"
import { Deployment } from "./deployment"
import { Disclosure } from "@reach/disclosure"
import { DeploymentPanel } from "./deployment-panel"

const chartSettings = {
  marginTop: 1,
  marginRight: 20,
  marginBottom: 60,
  marginLeft: 20,
  paddingX: 20,
}

const Legend = styled.div`
  min-width: 200px;
`

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`

const Swatch = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 4px;
  background-color: ${({ color }) => color};
`

export const TimelineChart = ({ deployments }) => {
  const [containerRef, dms] = useChartDimensions(chartSettings)
  // const startYear = getYear(
  //   new Date(
  //     d3.min(
  //       deployments.map(({ start, events }) =>
  //         d3.min([start, ...events.map(({ start }) => start)])
  //       )
  //     )
  //   )
  // )
  // const startDate = new Date(startYear - 1, 11, 31)
  // const endDate = new Date(startYear, 11, 31)
  // console.log(startDate)
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

  const range = [0, dms.boundedWidth - 200]
  // maps dates to x-values
  const xScale = d3.scaleUtc().domain(domain).range(range)

  const isFirstRun = useRef(true)
  const [selectedDeployment, setSelectedDeployment] = useState(null)
  const [count, setCount] = useState(1)
  const [priority, setPriority] = useState({})
  const [focussedDeployment, setFocussedDeployment] = useState(null)
  const [xPosition, setXPosition] = useState(null)
  const [tooltip, setTooltip] = useState({ x: null, y: null })
  const [tooltipContent, setTooltipContent] = useState(null)

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

  const events = deployments.reduce(
    (prev, deployment) => [...prev, ...deployment.events],
    []
  )

  return (
    <Disclosure open={!!selectedDeployment}>
      <div
        ref={containerRef}
        css={`
          display: flex;
        `}
      >
        <Legend>
          Events
          <LegendItem>
            <Swatch color={colors[NEGATIVE].dataVizOne} />
            {deployments.length} Deployment{deployments.length > 1 ? "s" : ""}
          </LegendItem>
          {events.length > 0 ? (
            <LegendItem>
              <Swatch color={colors[NEGATIVE].dataVizTwo} />
              {events.length} Significant Event{events.length > 1 ? "s" : ""}
            </LegendItem>
          ) : null}
        </Legend>

        <div
          css={`
            height: 70px;
            width: 100%;
            margin-bottom: 20px;
            margin-top: 6px;
            max-width: calc(1280px - 200px);
            position: relative;
          `}
        >
          <div
            style={{
              display: tooltipContent ? "flex" : "none",
              zIndex: 10,
              background: colors[POSITIVE].background,
              position: "absolute",
              bottom: -tooltip.y + 80,
              left: tooltip.x + 5,
              padding: 12,
              // opacity:  1 : 0,

              color: colors[POSITIVE].text,
              boxShadow:
                "rgba(255, 255, 255, 0.2) 0px -1px 1px 0px, rgba(255, 255, 255, 0.2) 0px 2px 6px 0px",
            }}
          >
            {tooltipContent}
          </div>
          <div>
            <svg // scrollable chart
              width={range[1] + chartSettings.paddingX * 2}
              height={dms.height}
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
                      setTooltip={setTooltip}
                      setTooltipContent={setTooltipContent}
                    />
                  )
                )}

                <g transform={`translate(${[0, dms.boundedHeight].join(",")})`}>
                  <Axis
                    {...{
                      domain,
                      range,
                      chartSettings,
                      xScale,
                      labelFormat: "year",
                    }}
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <DeploymentPanel
        selectedDeployment={selectedDeployment}
        setTooltip={setTooltip}
        setTooltipContent={setTooltipContent}
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
      campaign: PropTypes.string,
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
