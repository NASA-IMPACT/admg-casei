import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
  ContentGroup,
  ContentItem,
} from "../../components/section"
import Label from "../../components/label"
import FocusAreaGallery from "../../components/home/focus-area-gallery"

const FocusSection = ({ focus, geophysical, focusPhenomena }) => {
  return (
    <SectionBlock id="focus">
      <SectionHeader headline="Focus" to="#focus" />
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
            {geophysical.map((concept, i) => (
              <React.Fragment key={concept.id}>
                {i > 0 && ", " /* Add a comma between links */}
                <Link
                  to="/explore/campaigns"
                  state={{ selectedFilterId: concept.id }} // Pass state as props to the linked page
                  data-cy="geophysical-concept"
                  key={concept.id}
                >
                  {concept.longname}
                </Link>
              </React.Fragment>
            ))}
          </div>
          <ContentItem
            id="focus-content"
            label="Focus Phenomena"
            info={focusPhenomena}
          />
        </ContentGroup>
      </SectionContent>
    </SectionBlock>
  )
}

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
