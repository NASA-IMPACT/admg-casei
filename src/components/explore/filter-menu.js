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
import styled from "styled-components"

import { CloseIcon } from "../icons"
import { IconButton } from "../button"
import theme from "../../utils/theme"

const FilterButton = styled(ListboxButton)`
  flex-grow: 0;
  height: 2.5rem;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  border: 1px solid ${theme.color.base};
  color: ${theme.color.base};
  padding: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
`

const FilterItem = styled(ListboxOption)`
  display: flex;
  justify-content: space-between;
  background-color: ${props =>
    props.selected ? theme.color.secondary : theme.color.primary};

  &[data-reach-listbox-option][aria-selected="true"] {
    background: ${theme.color.secondary};
    opacity: 0.64;
  }
`

const FilterMenu = ({
  id,
  style,
  selectedFilterIds,
  addFilter,
  removeFilter,
  label,
  options,
}) => {
  const handleSelection = value => {
    selectedFilterIds.includes(value) ? removeFilter(value) : addFilter(value)
    setValue("")
  }

  let [value, setValue] = useState("")
  return (
    <div style={style}>
      <VisuallyHidden id={`${id}-filter-select`}>
        filter results by sub-categories
      </VisuallyHidden>
      <ListboxInput
        name="filter"
        aria-labelledby={`${id}-filter-select`}
        value={value}
        data-cy={`${id}-filter-select`}
        onChange={value => handleSelection(value)}
      >
        <FilterButton arrow="▼">{label}</FilterButton>
        <ListboxPopover
          style={{
            background: theme.color.primary,
            maxHeight: `24rem`,
            overflowY: `scroll`,
          }}
        >
          <ListboxList data-cy="filter-options">
            {options.map(o => (
              <FilterItem
                key={o.id}
                value={o.id}
                data-cy="filter-option"
                selected={!!selectedFilterIds.includes(o.id)}
              >
                {o.shortname}
                {selectedFilterIds.includes(o.id) && (
                  <IconButton
                    id="remove-filter"
                    icon={<CloseIcon color={theme.color.base} />}
                  />
                )}
              </FilterItem>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

FilterMenu.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
    })
  ).isRequired,
}

export default FilterMenu
