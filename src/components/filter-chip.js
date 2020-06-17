import React from "react"
import PropTypes from "prop-types"

import theme from "../utils/theme"
import { Button } from "@devseed-ui/button"

const FilterChip = ({ id, label, removeFilter }) => (
  <div
    style={{
      display: `flex`,
      alignItems: `center`,
      backgroundColor: theme.color.tertiary,
      color: theme.type.base.color,
      borderRadius: theme.shape.rounded,
      padding: `0 0.5rem`,
      margin: `0 0.5rem`,
    }}
    data-cy="filter-chip"
  >
    <small>{label}</small>
    <Button
      data-cy="remove-filter"
      useIcon="xmark"
      variation="achromic-plain"
      hideText
      size="small"
      id="close-icon"
      title="remove filter"
      style={{ marginLeft: `0.5rem` }}
      onClick={() => removeFilter(id)}
    >
      close icon
    </Button>
  </div>
)

FilterChip.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired,
}

export default FilterChip
