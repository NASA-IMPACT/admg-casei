import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import { VisuallyHidden } from "@reach/visually-hidden"

import { IconButton } from "../button"
import { CloseIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors, shape } from "../../theme"

export default function FilterBox({
  filterOptions,
  filterName,
  setSelectedFilterIds,
  selectedFilterIds,
}) {
  let [value, setValue] = useState("")

  const handleSelection = value => {
    selectedFilterIds.includes(value)
      ? setSelectedFilterIds(selectedFilterIds.filter(f => f !== value))
      : setSelectedFilterIds([...selectedFilterIds, value])
    setValue("")
  }

  return (
    <div
      css={`
        margin-right: 2rem;
      `}
    >
      <VisuallyHidden id={filterName}>{filterName}</VisuallyHidden>
      <ListboxInput
        id={`${filterName}-listbox`}
        aria-labelledby={filterName}
        defaultValue={value}
        onChange={value => handleSelection(value)}
        data-cy={`filter-by-${filterName}`}
      >
        <ListboxButton
          arrow="▼"
          css={`
            height: 2.5rem;
            webkit-appearance: none;
            background: transparent;
            border: 1px solid ${colors[NEGATIVE].text};
            border-radius: ${shape.rounded};
            color: ${colors[NEGATIVE].text};
            padding: 0.5rem;
            cursor: pointer;
          `}
        >
          {filterName.toUpperCase()}
        </ListboxButton>
        <ListboxPopover
          css={`
            background: ${colors[NEGATIVE].altBackground};
            max-height: 24rem;
            overflow-y: scroll;
          `}
        >
          <ListboxList data-cy="data-products-filter-options">
            {filterOptions.map(o => {
              return (
                <ListboxOption key={o.id} value={o.id} data-cy="filter-option">
                  {(o.longname || o.shortname).toUpperCase()}
                  {selectedFilterIds.includes(o.id) && (
                    <IconButton
                      id="remove-filter"
                      icon={<CloseIcon color={colors[NEGATIVE].text} />}
                    />
                  )}
                </ListboxOption>
              )
            })}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

FilterBox.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string,
      shortname: PropTypes.string.isRequired,
    })
  ).isRequired,
  filterName: PropTypes.string.isRequired,
  setSelectedFilterIds: PropTypes.func.isRequired,
  selectedFilterIds: PropTypes.array.isRequired,
}
