import PropTypes from "prop-types"
import React from "react"

import { DisclosurePanel } from "@reach/disclosure"
import { MinorTimeline } from "./minor-timeline"
import { IconButton } from "../button"
import { CloseIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { EventPanel } from "./event-panel"
import { Legend, LegendItem, Swatch } from "./timeline-chart"
import { EventDetail } from "./event-detail"
import { IopDetail } from "./iop-detail"
import { DeploymentDetail } from "./deployment-detail"

export const DeploymentPanel = ({
  selectedDeployment,
  setTooltip,
  setTooltipContent,
  setSelectedDeployment,
  selectedEvent,
  setSelectedEvent,
  hoveredDeployment,
  setHoveredDeployment,
}) => {
  if (!selectedDeployment) return <div />
  const { events, iops, regions, longname } = selectedDeployment

  const eventDetailSection = () => {
    switch (selectedEvent.type) {
      case "event":
        return (
          <EventDetail
            event={selectedEvent.content}
            setSelectedEvent={setSelectedEvent}
          />
        )
      case "iop":
        return (
          <IopDetail
            iop={selectedEvent.content}
            setSelectedEvent={setSelectedEvent}
          />
        )
      default:
        return <DeploymentDetail {...{ events, regions, longname }} />
    }
  }

  return (
    <DisclosurePanel style={{ height: "100%" }}>
      <div
        css={`
          display: flex;
          border-top: 1px rgba(255, 255, 255, 0.6) solid;
          position: relative;
          margin-top: 24px;
        `}
      >
        <div
          css={`
            position: absolute;
            right: 0px;
            z-index: 10;
          `}
        >
          <IconButton
            id="close-panel"
            action={() => {
              setSelectedDeployment(null)
              setSelectedEvent({ content: undefined, type: "deployment" })
            }}
            icon={<CloseIcon color={colors[NEGATIVE].text} />}
          />
        </div>

        <div
          css={`
            width: 200px;
            padding-top: 4.5em;
            padding-bottom: 1em;
          `}
        >
          <div
            css={`
              margin-bottom: 12px;
            `}
          >
            <div
              css={`
                font-weight: bold;
                font-size: 18px;
              `}
            >
              Deployment
            </div>
            <div>{selectedDeployment?.longname}</div>
          </div>

          <Legend>
            {iops.length > 0 ? (
              <LegendItem>
                <Swatch color={colors[NEGATIVE].dataVizThree} />
                {iops.length} IOP{iops.length > 1 ? "s" : ""}
              </LegendItem>
            ) : null}
            {events.length > 0 ? (
              <LegendItem>
                <Swatch color={colors[NEGATIVE].dataVizTwo} />
                {events.length} Significant Event{events.length > 1 ? "s" : ""}
              </LegendItem>
            ) : null}
          </Legend>
        </div>
        <div
          css={`
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          `}
        >
          <MinorTimeline
            deployment={selectedDeployment}
            setSelectedDeployment={setSelectedDeployment}
            setTooltip={setTooltip}
            setTooltipContent={setTooltipContent}
            setSelectedEvent={setSelectedEvent}
            selectedEvent={selectedEvent}
            hoveredDeployment={hoveredDeployment}
            setHoveredDeployment={setHoveredDeployment}
          />
          <EventPanel>{eventDetailSection()}</EventPanel>
        </div>
      </div>
    </DisclosurePanel>
  )
}

DeploymentPanel.propTypes = {
  selectedDeployment: PropTypes.object,
  setTooltip: PropTypes.func.isRequired,
  setTooltipContent: PropTypes.func.isRequired,
  setSelectedDeployment: PropTypes.func.isRequired,
  selectedEvent: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.object,
  }),
  setSelectedEvent: PropTypes.func.isRequired,
  hoveredDeployment: PropTypes.string,
  setHoveredDeployment: PropTypes.func.isRequired,
}
