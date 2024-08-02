import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors, breakpoints } from "../../theme"

export default function FilterChips({ clearFilters, children }) {
  return (
    <div
      css={`
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 0.5rem;
        align-items: center;
        @media screen and (min-width: ${breakpoints["sm"]}) {
          gap: 0.5rem 1rem;
        }
        margin: 0.5rem 0;
      `}
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
