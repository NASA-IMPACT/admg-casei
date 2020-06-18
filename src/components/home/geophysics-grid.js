import React from "react"
import PropTypes from "prop-types"

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
      <div
        key={concept.id}
        style={{
          border: `1px solid ${theme.color.base}`,
          padding: `1rem`,
          flexGrow: 1,
          textAlign: `center`,
        }}
      >
        {concept.shortname}
      </div>
    ))}
  </div>
)

GeophysicsGrid.propTypes = {
  geophysicalConcepts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
    })
  ),
}
