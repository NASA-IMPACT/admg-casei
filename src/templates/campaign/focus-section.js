import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
  ContentGroup,
} from "../../components/section"
import Label from "../../components/label"
import Chip from "../../components/chip"
import FocusAreaGallery from "../../components/home/focus-area-gallery"

const FocusSection = ({ id, focus, geophysical, focusPhenomena }) => (
  <SectionBlock id={id}>
    <SectionHeader headline="Focus" id={id} />
    <SectionContent withBackground>
      <ContentGroup>
        <div data-cy="focus-content">
          <Label showBorder id="focus-content">
            Focus Area
          </Label>
          <FocusAreaGallery focusAreas={focus} size="small" />
        </div>
        <div data-cy="focus-content">
          <Label showBorder id="focus-content">
            {`Geophysical Concept${geophysical.length > 1 ? "s" : ""}`}
          </Label>
          {geophysical.map(concept => (
            <React.Fragment key={concept.id}>
              <Link
                to="/explore/campaigns"
                state={{ selectedFilterId: concept.id }} // Pass state as props to the linked page
                data-cy="geophysical-concept"
                key={concept.id}
              >
                <Chip
                  id="geophysical-concept"
                  label={concept.longname}
                  isDark
                  isInline
                />
              </Link>
            </React.Fragment>
          ))}
        </div>
        <div data-cy="focus-content">
          <Label showBorder id="focus-content">
            Focus Phenomena
          </Label>
          {focusPhenomena.split(",").map(phenom => (
            <Chip
              key={phenom}
              id="focus-phenomena"
              label={phenom.toUpperCase()}
              isDark
              isInline
            />
          ))}
        </div>
      </ContentGroup>
    </SectionContent>
  </SectionBlock>
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
  focusPhenomena: PropTypes.string.isRequired,
}

export default FocusSection
