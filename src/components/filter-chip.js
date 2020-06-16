import React from "react"
import PropTypes from "prop-types"

import theme from "../utils/theme"

// TODO: figure out how to import and use collecticons directly
const CloseIcon = ({ color = "hsla(0,0%,100%,0.9)" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12px"
    height="12px"
    viewBox="0 0 16 16"
  >
    <polygon
      fill={color}
      points="13.707,3.707 12.293,2.293 8,6.586 3.707,2.293 2.293,3.707 6.586,8 2.293,12.293 3.707,13.707 8,9.414  12.293,13.707 13.707,12.293 9.414,8"
    />
  </svg>
)

CloseIcon.propTypes = {
  color: PropTypes.string,
}

const FilterChip = ({ id, label, removeFilter }) => (
  <div
    style={{
      display: `flex`,
      alignItems: `center`,
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
      style={{
        background: "none",
        border: "none",
        flexGrow: 0,
        cursor: `pointer`,
        color: `hsla(0,0%,100%,0.9)`,
        verticalAlign: `middle`,
      }}
      data-cy="remove-filter"
    >
      <span role="img" aria-label="close-icon">
        <CloseIcon />
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
