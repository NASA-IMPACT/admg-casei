import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import VisuallyHidden from "@reach/visually-hidden"

import { IconButton } from "../button"
import { CloseIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors, shape } from "../../theme"

export default function Filter({
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
    <div style={{ marginRight: `2rem` }}>
      <VisuallyHidden id={filterName}>{filterName}</VisuallyHidden>
      <ListboxInput
        aria-labelledby={filterName}
        defaultValue={value}
        onChange={value => handleSelection(value)}
        data-cy={`filter-by-${filterName}`}
      >
        <ListboxButton
          arrow="▼"
          style={{
            height: `2.5rem`,
            WebkitAppearance: `none`,
            background: `transparent`,
            border: `1px solid ${colors[NEGATIVE].text}`,
            borderRadius: `${shape.rounded} `,
            color: colors[NEGATIVE].text,
            padding: `0.5rem`,
            cursor: `pointer`,
          }}
        >
          {filterName.toUpperCase()}
        </ListboxButton>
        <ListboxPopover style={{ background: colors[NEGATIVE].altBackground }}>
          <ListboxList data-cy="data-products-filter-options">
            {filterOptions.map(o => {
              const value = o.longname || o.shortname
              return (
                <ListboxOption key={o.id} value={value} data-cy="filter-option">
                  {value.toUpperCase()}
                  {selectedFilterIds.includes(value) && (
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

Filter.propTypes = {
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      dois: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    })
  ).isRequired,
  filterName: PropTypes.string.isRequired,
  setSelectedFilterIds: PropTypes.func.isRequired,
  selectedFilterIds: PropTypes.array.isRequired,
}
