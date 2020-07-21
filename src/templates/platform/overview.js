import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { SectionBlock } from "../../components/section"

export default function Overview({ description }) {
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
        {/* <ul data-cy="platform-link-list"> // TODO: add in when we get website info
          {primaryWebsite && (
            <ListLink to={primaryWebsite}>{`${shortname} Primary Website`}</ListLink>
          )}
          {secondary && (
            <ListLink to={secondary}>{`${shortname} Secondary Website`}</ListLink>
          )}
        </ul> */}
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
  // shortname: PropTypes.string.isRequired,
}
