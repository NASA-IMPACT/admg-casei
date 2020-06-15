import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

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
    <section className="inpage-nav" id="focus" data-cy="focus-section">
      <h2>Focus</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `1fr 1fr 1fr`,
          gap: `1rem`,
          margin: `0 -1rem`,
          padding: `1rem`,
        }}
      >
        <div>
          <label
            style={{
              textTransform: `uppercase`,
              color: `#6B6B6B`,
            }}
          >
            Focus Area
          </label>
          <FocusArea />
        </div>
        <div>
          <label
            style={{
              textTransform: `uppercase`,
              color: `#6B6B6B`,
            }}
          >
            Focus Phenomena
          </label>
          <p>{focusPhenomena}</p>
        </div>
        <div>
          <label
            style={{
              textTransform: `uppercase`,
              color: `#6B6B6B`,
            }}
          >
            Science Keywords
          </label>
          <p>{scienceKeywords}</p>
        </div>
      </div>
    </section>
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
