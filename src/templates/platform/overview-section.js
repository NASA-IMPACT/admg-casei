import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import VisuallyHidden from "@reach/visually-hidden"

import {
  Section,
  SectionHeader,
  SectionContent,
  ListLink,
} from "../../components/layout"

export default function OverviewSection({
  id,
  description,
  onlineInformation,
}) {
  return (
    <Section id={id} mode="lightTheme">
      <VisuallyHidden>
        <SectionHeader headline="Overview" id={id} />
      </VisuallyHidden>
      <SectionContent mode="lightTheme" columns={[1, 7]}>
        <h3>Overview</h3>
        <p>{description}</p>
      </SectionContent>
      <SectionContent mode="lightTheme" columns={[1, 8]}>
        <h3>Online information</h3>
        <ul style={{ margin: 0, listStyle: `none` }} data-cy="link-list">
          {onlineInformation.map(link => (
            <ListLink key={link} to={link} mode="lightTheme" noPadding>
              {link}
            </ListLink>
          ))}
        </ul>
      </SectionContent>
    </Section>
  )
}
export const platformOverviewFields = graphql`
  fragment platformOverviewFields on platform {
    description
    onlineInformation: online_information
  }
`

OverviewSection.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onlineInformation: PropTypes.string.isRequired,
}
