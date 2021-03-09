import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../utils/theme"

const MissionSection = ({ id, missions }) => (
  <Section id={id}>
    <SectionHeader headline="Supported NASA Missions" id={id} />

    <SectionContent
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(15rem, 1fr))`,
        gap: `1rem`,
      }}
    >
      {missions.length > 0 ? (
        missions.map(mission => (
          <div
            key={mission}
            style={{
              padding: `1.5rem`,
              display: `flex`,
              gap: `1.5rem`,
              alignItems: `center`,
              backgroundColor: colors[NEGATIVE].background,
            }}
            data-cy="linked-mission"
          >
            <label>{mission}</label>
          </div>
        ))
      ) : (
        <p>No NASA Missions available.</p>
      )}
    </SectionContent>
  </Section>
)

export const mission = graphql`
  fragment missionFields on campaign {
    missions: nasa_missions
  }
`

MissionSection.propTypes = {
  id: PropTypes.string.isRequired,
  missions: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default MissionSection
