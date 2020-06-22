import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SectionBlock from "../../components/section/section-block"
import ContentGroup from "../../components/section/content-group"
import ContentHeader from "../../components/section/content-header"
import ContentItem from "../../components/section/content-item"

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
  const FocusArea = () =>
    data.allFocusArea.nodes
      .filter(x => focusAreaIds.includes(x.id))
      .map(x => (
        <div style={{ display: `flex`, alignItems: `center` }} key={x.id}>
          <div
            style={{
              borderRadius: `2.5rem`,
              width: `2.5rem`,
              height: `2.5rem`,
              margin: `0.5rem`,
            }}
          ></div>
          {x.shortname}
        </div>
      ))

  return (
    <SectionBlock sectionTitle="Focus" id="focus" dataCy="focus-section">
      <ContentGroup>
        <div data-cy="focus-content">
          <ContentHeader label="Focus Area" dataCy="focus-content" />
          <FocusArea />
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
