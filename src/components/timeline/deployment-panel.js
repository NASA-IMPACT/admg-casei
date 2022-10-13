import PropTypes from "prop-types"
import React from "react"

import { DisclosurePanel } from "@reach/disclosure"

export const DeploymentPanel = ({ selectedDeployment }) => {
  return (
    <DisclosurePanel style={{ height: "200px", border: "2px white solid" }}>
      <div
        style={{ marginTop: "20px" }}
      >{`Currently selected Deployment ${selectedDeployment}`}</div>
    </DisclosurePanel>
  )
}

DeploymentPanel.propTypes = {
  selectedDeployment: PropTypes.string.isRequired,
}
