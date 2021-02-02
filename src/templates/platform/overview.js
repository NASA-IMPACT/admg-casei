import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import { BodyText } from "../../theme/typography"

export default function Overview({ id, description }) {
  return (
    <Section id={id}>
      <SectionHeader headline="Overview" id={id} />
      <SectionContent columns={[1, 7]}>
        <BodyText>{description}</BodyText>
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
    </Section>
  )
}
export const platformOverviewFields = graphql`
  fragment platformOverviewFields on platform {
    description
  }
`

Overview.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  // shortname: PropTypes.string.isRequired,
}
