import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import theme from "../../utils/theme"

export const GeophysicsGrid = ({ geophysicalConcepts }) => (
  <div
    style={{
      display: `flex`,
      flexWrap: `wrap`,
      border: `1px solid ${theme.color.base}`,
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
            border: `1px solid ${theme.color.base}`,
            padding: `1rem`,
            textAlign: `center`,
            fontWeight: `bold`,
          }}
        >
          {concept.longname}
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
