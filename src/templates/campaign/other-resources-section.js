import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import {
  Section,
  SectionHeader,
  SectionContent,
  ListLink,
} from "../../components/layout"

const OtherResourcesSection = ({ id, resources }) => (
  <Section id={id}>
    <SectionHeader headline="Other Resources" id={id} />

    <SectionContent
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(15rem, 1fr))`,
        gap: `1rem`,
      }}
    >
      {resources.length > 0 ? (
        <ul style={{ margin: 0, listStyle: `none` }}>
          {resources.map(resource => (
            <ListLink key={resource} to={resource}>
              {resource}
            </ListLink>
          ))}
        </ul>
      ) : (
        <p>No other resources available.</p>
      )}
    </SectionContent>
  </Section>
)

export const resource = graphql`
  fragment resourceFields on campaign {
    resources: other_resources
  }
`

OtherResourcesSection.propTypes = {
  id: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default OtherResourcesSection
