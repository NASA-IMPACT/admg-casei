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
import { POSITIVE } from "../../utils/constants"

export default function OverviewSection({
  id,
  description,
  onlineInformation,
}) {
  return (
    <Section id={id} mode={POSITIVE}>
      <VisuallyHidden>
        <SectionHeader headline="Overview" id={id} />
      </VisuallyHidden>
      <SectionContent mode={POSITIVE} columns={[1, 7]}>
        <h3>Overview</h3>
        <p>{description}</p>
      </SectionContent>
      {onlineInformation.length && (
        <SectionContent mode={POSITIVE} columns={[1, 8]}>
          <h3>Online information</h3>
          <ul
            css={`
              margin: 0;
              list-style: none;
            `}
            data-cy="link-list"
          >
            {onlineInformation.map(link => (
              <ListLink key={link} to={link} mode={POSITIVE} noPadding>
                {link}
              </ListLink>
            ))}
          </ul>
        </SectionContent>
      )}
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
  onlineInformation: PropTypes.arrayOf(PropTypes.string).isRequired,
}
