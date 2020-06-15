import React from "react"
import PropTypes from "prop-types"

import theme from "../utils/theme"

const FilterChip = ({ id, label, removeFilter }) => (
  <div
    style={{
      backgroundColor: `${theme.color.lightgray}`,
      color: `${theme.color.primary}`,
      borderRadius: `${theme.shape.rounded}`,
      paddingLeft: `0.5rem`,
      margin: `0 0.5rem`,
    }}
    data-cy="filter-chip"
  >
    <small>{label}</small>
    <button
      type="button"
      onClick={() => removeFilter(id)}
      style={{ background: "none", border: "none", flexGrow: 0 }}
      data-cy="remove-filter"
    >
      <span role="img" aria-label="close-icon">
        🆇
      </span>
    </button>
  </div>
)

FilterChip.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
}

export default FilterChip
