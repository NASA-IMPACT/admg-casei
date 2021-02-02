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

import theme from "../../utils/theme"
import { sortFunctions } from "../../utils/filter-utils"
import { ButtonText } from "../../theme/typography"

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
            border: `1px solid ${theme.color.base}`,
            borderRadius: theme.shape.rounded,
            color: theme.color.base,
            padding: `0.5rem`,
            cursor: `pointer`,
          }}
        >
          <ButtonText>{sortOrder.toUpperCase()}</ButtonText>
        </ListboxButton>
        <ListboxPopover style={{ background: theme.color.primary }}>
          <ListboxList data-cy="sort-options">
            {Object.keys(sortFunctions[category]).map(o => (
              <ListboxOption key={o} value={o} data-cy="sort-option">
                <ButtonText>{o.toUpperCase()}</ButtonText>
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
