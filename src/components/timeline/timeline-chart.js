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

  const minDateString = d3
    .min(
      deployments.map(({ start, events }) =>
        d3.min([start, ...events.map(({ start }) => start)])
      )
    )
    .split("-")

  const minDate = new Date([minDateString[0], "01", "01"].join("-"))

  const maxDateString = d3
    .max(
      deployments.map(({ end, events }) =>
        d3.max([end, ...events.map(({ end }) => end)])
      )
    )
    .split("-")

  const maxDate = new Date([maxDateString[0], "12", "31"].join("-"))

  const domain = [minDate, maxDate]

  const range = [0, dms.boundedWidth - 200]
  // maps dates to x-values
  const xScale = d3.scaleUtc().domain(domain).range(range)

  const isFirstRun = useRef(true)
  const tooltipRef = useRef(null)
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

  const iops = deployments.reduce(
    (prev, deployment) => [...prev, ...deployment.iops],
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
          {iops.length > 0 ? (
            <LegendItem>
              <Swatch color={colors[NEGATIVE].dataVizThree} />
              {iops.length} IOP{iops.length > 1 ? "s" : ""}
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
            ref={tooltipRef}
            style={{
              display: tooltipContent ? "flex" : "none",
              maxWidth: "600px",
              zIndex: 11,
              background: colors[POSITIVE].background,
              position: "absolute",
              bottom: -tooltip.y + 86,
              left: tooltip.x - 8 - tooltipRef.current?.clientWidth / 2,
              padding: 12,
              color: colors[POSITIVE].text,
              boxShadow:
                "rgba(255, 255, 255, 0.2) 0px -1px 1px 0px, rgba(255, 255, 255, 0.2) 0px 2px 2px 0px",
            }}
          >
            {tooltipContent}
            <div
              style={{
                position: "absolute",
                border: "10px solid white",
                bottom: -15,
                left: "50%",
                borderColor: "white transparent transparent transparent",
              }}
            />
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
                    iops,
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
                        iops,
                        xScale,
                        update,
                      }}
                      yPosition={dms.boundedHeight - 18}
                      priority={priority[id] || 0}
                      isFocussed={focussedDeployment === id}
                      isAnyFocussed={!!focussedDeployment}
                      updateFocus={updateFocus}
                      setSelectedDeployment={setSelectedDeployment}
                      selectedDeployment={selectedDeployment}
                      setTooltip={setTooltip}
                      setTooltipContent={setTooltipContent}
                      eventOffsetY={-16}
                      showDeploymentTooltip
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
        setSelectedDeployment={setSelectedDeployment}
      />
    </Disclosure>
  )
}

TimelineChart.propTypes = {
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      iops: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          short_name: PropTypes.string.isRequired,
          start_date: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          end_date: PropTypes.string.isRequired,
        })
      ),
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
