import React from "react"

const FilterChip = ({ id, label, removeFilter }) => (
  <div
    style={{
      backgroundColor: `#efefef`,
      color: `hsla(0,0%,0%,0.73)`,
      borderRadius: `0.25rem`,
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

export default FilterChip
