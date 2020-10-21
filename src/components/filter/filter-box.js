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

import { CloseIcon } from "../icons"
import { IconButton } from "../button"
import theme from "../../utils/theme"

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
            border: `1px solid ${theme.color.base}`,
            borderRadius: `${theme.shape.rounded} `,
            color: theme.color.base,
            padding: `0.5rem`,
            cursor: `pointer`,
          }}
        >
          {filterName.toUpperCase()}
        </ListboxButton>
        <ListboxPopover style={{ background: theme.color.primary }}>
          <ListboxList data-cy="data-products-filter-options">
            {filterOptions.map(o => (
              <ListboxOption
                key={o.id}
                value={o.longname}
                data-cy="filter-option"
              >
                {o.longname.toUpperCase()}
                {selectedFilterIds.includes(o.longname) && (
                  <IconButton
                    id="remove-filter"
                    icon={<CloseIcon color={theme.color.base} />}
                  />
                )}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

Filter.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  filterName: PropTypes.string.isRequired,
  setSelectedFilterIds: PropTypes.func.isRequired,
  selectedFilterIds: PropTypes.array.isRequired,
}
