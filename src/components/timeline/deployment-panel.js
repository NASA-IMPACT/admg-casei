import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import { DisclosurePanel } from "@reach/disclosure"
import { MinorTimeline } from "./minor-timeline"

const SubHeader = styled.div`
  font-weight: bold;
  font-size: 14px;
`

const InfoContent = styled.div`
  font-size: 12px;
`

export const DeploymentPanel = ({ selectedDeployment }) => {
  if (!selectedDeployment) return <div />
  const { start, end, events, regions, shortname } = selectedDeployment
  console.log(selectedDeployment)
  return (
    <DisclosurePanel style={{ height: "200px" }}>
      <div
        css={`
          display: flex;
          border: 2px white solid;
        `}
      >
        <div
          css={`
            width: 13em;
            padding-left: 1em;
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
            <SubHeader>Date</SubHeader>
            <InfoContent>{`${start}-${end}`}</InfoContent>
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
          <MinorTimeline deployment={selectedDeployment} />
        </div>
      </div>
    </DisclosurePanel>
  )
}

DeploymentPanel.propTypes = {
  selectedDeployment: PropTypes.string.isRequired,
}
