import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

const SortMenu = ({ sortOrder, toggleSortOrder }) => (
  <select
    defaultValue={sortOrder}
    aria-label="Select sort order"
    name="sort"
    id="sort-select"
    onChange={e => toggleSortOrder(e.target.value)}
    style={{
      height: `2.5rem`,
      WebkitAppearance: `none`,
      background: `transparent`,
      border: `1px solid ${theme.type.base.color}`,
      borderRadius: `0 ${theme.shape.rounded} ${theme.shape.rounded} 0`,
      color: theme.type.base.color,
      padding: `0.5rem`,
    }}
    data-cy="sort-select"
  >
    <option value="asc">A to Z</option>
    <option value="desc">Z to A</option>
  </select>
)

SortMenu.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  toggleSortOrder: PropTypes.func.isRequired,
}

export default SortMenu
