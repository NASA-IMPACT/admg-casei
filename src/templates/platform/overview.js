import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Label from "../../components/label"
import { SectionBlock } from "../../components/section"

export default function Overview({ description, shortname }) {
  return (
    <SectionBlock headline="Overview" id="platform-overview">
      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `5fr 3fr`,
          columnGap: `2rem`,
        }}
      >
        <div>
          <p>{description}</p>
        </div>
        <div data-cy="link-list">
          <Label id={"instrument-manufacturer"} showBorder>
            {`${shortname} Primary Website`}
          </Label>
          {"N/A"}
          <div style={{ padding: `1rem 0` }}>
            <Label id={"funding-source"} showBorder>
              {`${shortname} Secondary Website`}
            </Label>
            {"N/A"}
          </div>
        </div>
      </div>
    </SectionBlock>
  )
}
export const platformOverviewFields = graphql`
  fragment platformOverviewFields on platform {
    description
  }
`

Overview.propTypes = {
  description: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
}
