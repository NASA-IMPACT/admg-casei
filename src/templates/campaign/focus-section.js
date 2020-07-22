import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import {
  SectionBlock,
  ContentGroup,
  ContentItem,
} from "../../components/section"
import Label from "../../components/label"
import FocusAreaGallery from "../../components/home/focus-area-gallery"

const FocusSection = ({ focus, geophysical, focusPhenomena }) => {
  return (
    <SectionBlock headline="Focus" id="focus" withBackground>
      <ContentGroup>
        <div data-cy="focus-content">
          <Label showBorder id="focus-content">
            Focus Area
          </Label>
          <FocusAreaGallery focusAreas={focus} size="small" />
        </div>
        <ContentItem
          id="focus-content"
          label={`Geophysical Concept${geophysical.length > 1 ? "s" : ""}`}
          info={geophysical.map(x => x.shortname).join(", ")}
        />
        <ContentItem
          id="focus-content"
          label="Focus Phenomena"
          info={focusPhenomena}
        />
      </ContentGroup>
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
      shortname: short_name
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
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
  focusPhenomena: PropTypes.string.isRequired,
}

export default FocusSection
