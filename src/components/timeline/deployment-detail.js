import React from "react"
import PropTypes from "prop-types"
import { MainHeader, SectionContent, SubHeader } from "./iop-detail"

export const DeploymentDetail = ({ longname, regions }) => {
  return (
    <div>
      <MainHeader>{longname}</MainHeader>
      <div>
        <SubHeader>Regions</SubHeader>
        <SectionContent>
          {regions?.length === 1 ? regions[0].short_name : "multiple"}
        </SectionContent>
      </div>
    </div>
  )
}

DeploymentDetail.propTypes = {
  regions: PropTypes.array.isRequired,
  longname: PropTypes.string.isRequired,
}
