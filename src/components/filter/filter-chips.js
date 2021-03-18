import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

export default function FilterChips({ clearFilters, children }) {
  return (
    <div
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        margin: `2rem 0`,
        alignItems: `center`,
      }}
    >
      Active filters:
      {children}
      {children.flat().filter(c => c).length > 1 && (
        <button
          data-cy="clear-filters"
          onClick={clearFilters}
          css={`
            background: none;
            border: none;
            text-transform: none;
            text-decoration-line: underline;
            color: ${colors[NEGATIVE].linkText};
            cursor: pointer;
          `}
        >
          Clear all
        </button>
      )}
    </div>
  )
}

FilterChips.propTypes = {
  children: PropTypes.node,
  clearFilters: PropTypes.func.isRequired,
}
