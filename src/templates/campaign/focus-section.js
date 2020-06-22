import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SectionBlock from "../../components/section/section-block"
import ContentGroup from "../../components/section/content-group"
import Label from "../../components/label"
import ContentItem from "../../components/section/content-item"
import FocusAreaGallery from "../../components/home/focus-area-gallery"

const FocusSection = ({ focusAreaIds, focusPhenomena, scienceKeywords }) => {
  const data = useStaticQuery(graphql`
    query {
      allFocusArea {
        nodes {
          id
          shortname: short_name
          longname: long_name
        }
      }
    }
  `)

  return (
    <SectionBlock sectionTitle="Focus" id="focus" dataCy="focus-section">
      <ContentGroup>
        <div data-cy="focus-content">
          <Label showBorder dataCy="focus-content">
            Focus Area
          </Label>
          <FocusAreaGallery
            focusAreas={data.allFocusArea.nodes.filter(x =>
              focusAreaIds.includes(x.id)
            )}
            size="small"
          />
        </div>
        <ContentItem
          dataCy="focus-content"
          label="Geophysical Concept"
          info={scienceKeywords}
        />
        <ContentItem
          dataCy="focus-content"
          label="Focus Phenomena"
          info={focusPhenomena}
        />
      </ContentGroup>
    </SectionBlock>
  )
}

export const focus = graphql`
  fragment focusFields on campaign {
    focusAreaIds: focus_areas
    focusPhenomena: focus_phenomena
  }
`

FocusSection.propTypes = {
  focusAreaIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  focusPhenomena: PropTypes.string.isRequired,
  scienceKeywords: PropTypes.string,
}

export default FocusSection
