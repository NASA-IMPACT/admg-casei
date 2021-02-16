import React from "react"
import PropTypes from "prop-types"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import VisuallyHidden from "@reach/visually-hidden"

import { colors, shape } from "../../utils/theme"
import { sortFunctions } from "../../utils/filter-utils"

const SortMenu = ({ sortOrder, setSortOrder, category }) => {
  return (
    <>
      <VisuallyHidden id="sort-order">Select sort order</VisuallyHidden>
      <ListboxInput
        aria-labelledby="sort order"
        defaultValue={sortOrder}
        onChange={value =>
          setSortOrder(prev => ({ ...prev, [category]: value }))
        }
        data-cy="sort-select"
      >
        <ListboxButton
          arrow="▼"
          style={{
            height: `2.5rem`,
            WebkitAppearance: `none`,
            background: `transparent`,
            border: `1px solid ${colors.darkTheme.text}`,
            borderRadius: shape.rounded,
            color: colors.darkTheme.text,
            padding: `0.5rem`,
            cursor: `pointer`,
          }}
        >
          {sortOrder.toUpperCase()}
        </ListboxButton>
        <ListboxPopover style={{ background: colors.darkTheme.altBackground }}>
          <ListboxList data-cy="sort-options">
            {Object.keys(sortFunctions[category]).map(o => (
              <ListboxOption key={o} value={o} data-cy="sort-option">
                {o.toUpperCase()}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </>
  )
}

SortMenu.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
}

export default SortMenu
