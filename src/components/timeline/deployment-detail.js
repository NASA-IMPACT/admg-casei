import React from "react"
import PropTypes from "prop-types"
import { MainHeader, SectionContent, SubHeader } from "./iop-detail"

export const DeploymentDetail = ({ longname, regions, aliases }) => {
  return (
    <div>
      <MainHeader>{longname}</MainHeader>
      <div>
        <SubHeader>Regions</SubHeader>
        <SectionContent>
          {regions?.length === 1 ? regions[0].short_name : "multiple"}
        </SectionContent>
      </div>
      {aliases.length > 0 && (
        <div>
          <SubHeader>Community Aliases</SubHeader>
          <SectionContent>
            {aliases.map(alias => alias.shortname).join(", ")}
          </SectionContent>
        </div>
      )}
    </div>
  )
}

DeploymentDetail.propTypes = {
  regions: PropTypes.array.isRequired,
  longname: PropTypes.string.isRequired,
  aliases: PropTypes.arrayOf(PropTypes.string),
}
