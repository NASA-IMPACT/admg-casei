import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

export const GeophysicsGrid = ({ geophysicalConcepts }) => (
  <div
    css={`
      display: flex;
      flex-wrap: wrap;
      border: 1px solid ${colors[NEGATIVE].text};
    `}
  >
    {geophysicalConcepts.map(concept => (
      <Link
        to="/explore/campaigns"
        state={{ selectedFilterId: concept.id }} // Pass state as props to the linked page
        css={{ flexGrow: 1 }}
        data-cy="geophysical-concept"
        key={concept.id}
      >
        <div
          css={`
            border: 1px solid ${colors[NEGATIVE].text};
            padding: 1rem;
            text-align: center;
          `}
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
