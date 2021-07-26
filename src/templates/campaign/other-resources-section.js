import React from "react"
import PropTypes from "prop-types"

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
      css={`
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        gap: 1rem;
      `}
    >
      {resources.length > 0 ? (
        <ul
          css={`
            margin: 0;
            list-style: none;
          `}
        >
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

OtherResourcesSection.propTypes = {
  id: PropTypes.string.isRequired,
  resources: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default OtherResourcesSection
