import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { DisclosurePanel } from "@reach/disclosure"
import { MinorTimeline } from "./minor-timeline"
import { IconButton } from "../button"
import { CloseIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const SubHeader = styled.div`
  font-weight: bold;
  font-size: 14px;
`

const InfoContent = styled.div`
  font-size: 12px;
`

export const DeploymentPanel = ({
  selectedDeployment,
  setTooltip,
  setTooltipContent,
  setSelectedDeployment,
}) => {
  if (!selectedDeployment) return <div />
  const { events, regions, shortname } = selectedDeployment

  return (
    <DisclosurePanel style={{ height: "200px" }}>
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
            id="remove-filter"
            action={() => setSelectedDeployment(null)}
            icon={<CloseIcon color={colors[NEGATIVE].text} />}
          />
        </div>

        <div
          css={`
            width: 200px;

            padding-top: 1em;
            padding-bottom: 1em;
            display: grid;
          `}
        >
          <div>
            <SubHeader>Deployment</SubHeader>
            <InfoContent>{shortname}</InfoContent>
          </div>
          <div>
            <SubHeader>Regions</SubHeader>
            <InfoContent>
              {regions.length === 1 ? regions[0].short_name : "multiple"}
            </InfoContent>
          </div>
          <div>
            <SubHeader>Significant Events</SubHeader>
            <InfoContent>{events.length}</InfoContent>
          </div>
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
            setTooltip={setTooltip}
            setTooltipContent={setTooltipContent}
          />
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
}
