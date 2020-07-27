import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"

export default function Overview({ description }) {
  return (
    <SectionBlock id="platform-overview">
      <SectionHeader headline="Overview" />
      <SectionContent columns={[1, 7]}>
        <p>{description}</p>
      </SectionContent>
      {/* <SectionContent columns={[8, 4]}>
        <ul data-cy="platform-link-list">
          // TODO: add in when we get website info
          {primaryWebsite && (
            <ListLink
              to={primaryWebsite}
            >{`${shortname} Primary Website`}</ListLink>
          )}
          {secondary && (
            <ListLink
              to={secondary}
            >{`${shortname} Secondary Website`}</ListLink>
          )}
        </ul>
      </SectionContent> */}
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
