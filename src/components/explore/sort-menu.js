import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"
import { sortFunctions } from "../../utils/filter-utils"

const SortMenu = ({ sortOrder, setSortOrder, category }) => (
  <select
    defaultValue={sortOrder}
    aria-label="Select sort order"
    name="sort"
    id="sort-select"
    onChange={e => setSortOrder(e.target.value)}
    style={{
      height: `2.5rem`,
      WebkitAppearance: `none`,
      background: `transparent`,
      border: `1px solid ${theme.color.base}`,
      borderRadius: `0 ${theme.shape.rounded} ${theme.shape.rounded} 0`,
      color: theme.color.base,
      padding: `0.5rem`,
    }}
    data-cy="sort-select"
  >
    {Object.keys(sortFunctions[category]).map(o => (
      <option key={o} value={o}>
        {o.toUpperCase()}
      </option>
    ))}
  </select>
)

SortMenu.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
}

export default SortMenu
