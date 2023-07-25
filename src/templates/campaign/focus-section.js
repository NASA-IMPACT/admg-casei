import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import styled from "@emotion/styled"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import Label from "../../components/label"
import Chip from "../../components/chip"
import FocusAreaGallery from "../../components/focus-area-gallery"
import Button from "../../components/button"

const FocusContent = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const FocusSection = ({ id, focus, geophysical, focusPhenomena, missions }) => (
  <Section id={id}>
    <SectionHeader headline="Focus" id={id} />
    <SectionContent
      css={`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 3rem 1rem;
      `}
    >
      <div data-cy="focus-content">
        <Label showBorder id="focus-content">
          Focus Area
        </Label>
        <FocusAreaGallery focusAreas={focus} size="small" isCompact />
      </div>

      <div data-cy="focus-content">
        <Label showBorder id="focus-content">
          {`Geophysical Concept${geophysical.length > 1 ? "s" : ""}`}
        </Label>
        <FocusContent>
          {geophysical.map(concept => (
            <Slice alias="button" key={concept.id} as="div" isSecondary>
              <Link
                to="/explore/campaigns"
                state={{ selectedFilterId: concept.id }} // Pass state as props to the linked page
                data-cy="geophysical-concept-link"
              >
                {concept.longname}
              </Link>
            </Slice>
          ))}
        </FocusContent>
      </div>

      <div data-cy="focus-content">
        <Label showBorder id="focus-content">
          Focus Phenomena
        </Label>
        <FocusContent>
          {focusPhenomena.map(phenom => (
            <Chip
              key={phenom}
              id="focus-phenomena"
              label={phenom.toUpperCase()}
              isInline
            />
          ))}
        </FocusContent>
      </div>

      <div data-cy="focus-content">
        <Label showBorder id="focus-content">
          Supported NASA Missions
        </Label>
        <FocusContent>
          {missions.map(mission => (
            <Chip
              key={mission}
              id="focus-mission"
              label={mission.toUpperCase()}
              isInline
            />
          ))}
        </FocusContent>
      </div>
    </SectionContent>
  </Section>
)

export const focus = graphql`
  fragment focusFields on campaign {
    focus: focus_areas {
      id
      shortname: short_name
      longname: long_name
    }
    geophysical: geophysical_concepts {
      id
      longname: long_name
    }
    focusPhenomena: focus_phenomena
    missions: nasa_missions
  }
`

FocusSection.propTypes = {
  id: PropTypes.string.isRequired,
  focus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
  geophysical: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    })
  ).isRequired,
  focusPhenomena: PropTypes.arrayOf(PropTypes.string).isRequired,
  missions: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default FocusSection
