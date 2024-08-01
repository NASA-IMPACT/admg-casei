import React from "react"
import PropTypes from "prop-types"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import { VisuallyHidden } from "@reach/visually-hidden"
import { v4 as uuidv4 } from "uuid"
import { NEGATIVE } from "../../utils/constants"
import { colors, shape } from "../../theme"
import { sortFunctions } from "../../utils/filter-utils"

const SortMenu = ({ sortOrder, setSortOrder, category }) => {
  return (
    <div
      css={`
         {
          display: flex;
          justify-content: flex-end;
          margin: 2rem 0;
          white-space: nowrap;
        }
      `}
    >
      <VisuallyHidden id="sort-order">Select sort order</VisuallyHidden>
      <ListboxInput
        id={`${category}-${uuidv4()}`}
        aria-labelledby="sort order"
        defaultValue={sortOrder}
        onChange={value => setSortOrder(value)}
        data-cy="sort-select"
      >
        <ListboxButton
          arrow="▼"
          css={`
             {
              height: 2.5rem;
              -webkit-appearance: none;
              background: transparent;
              border: 1px solid ${colors[NEGATIVE].text};
              border-radius: ${shape.rounded};
              color: ${colors[NEGATIVE].text};
              padding: 0.5rem;
              cursor: pointer;
            }
          `}
        >
          {sortOrder.toUpperCase()}
        </ListboxButton>
        <ListboxPopover
          css={`
             {
              background: ${colors[NEGATIVE].altBackground};
            }
          `}
        >
          <ListboxList data-cy="sort-options">
            {Object.keys(sortFunctions[category]).map(o => (
              <ListboxOption key={o} value={o} data-cy="sort-option">
                {o.toUpperCase()}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

SortMenu.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  category: PropTypes.oneOf([
    "campaigns",
    "platforms",
    "instruments",
    "products",
  ]).isRequired,
}

export default SortMenu
