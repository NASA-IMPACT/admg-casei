import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../utils/theme"

export const GeophysicsGrid = ({ geophysicalConcepts }) => (
  <div
    style={{
      display: `flex`,
      flexWrap: `wrap`,
      border: `1px solid ${colors[NEGATIVE].text}`,
    }}
  >
    {geophysicalConcepts.map(concept => (
      <Link
        to="/explore"
        state={{ selectedFilterId: concept.id }} // Pass state as props to the linked page
        style={{ flexGrow: 1 }}
        data-cy="geophysical-concept"
        key={concept.id}
      >
        <div
          style={{
            border: `1px solid ${colors[NEGATIVE].text}`,
            padding: `1rem`,
            textAlign: `center`,
          }}
        >
          <label>{concept.longname}</label>
        </div>
      </Link>
    ))}
  </div>
)

GeophysicsGrid.propTypes = {
  geophysicalConcepts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      longname: PropTypes.string,
    })
  ),
}
