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

import { NEGATIVE } from "../../utils/constants"
import { IconButton } from "../button"
import { CloseIcon } from "../../icons"
import { colors } from "../../theme"

const FilterButton = styled(ListboxButton)`
  flex-grow: 0;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  border: 1px solid ${colors[NEGATIVE].text};
  color: ${colors[NEGATIVE].text};
  padding: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
`

const FilterItem = styled(ListboxOption)`
  display: flex;
  justify-content: space-between;
  background-color: ${props =>
    props.selected
      ? colors[NEGATIVE].background
      : colors[NEGATIVE].altBackground};

  &[data-reach-listbox-option][aria-selected="true"] {
    background: ${colors[NEGATIVE].background};
    opacity: 0.64;
  }
`

const FilterMenu = ({
  id,
  selectedFilterIds,
  addFilter,
  removeFilter,
  label,
  options,
  category,
}) => {
  const handleSelection = value => {
    selectedFilterIds.includes(value) ? removeFilter(value) : addFilter(value)
    setValue("")
  }

  let [value, setValue] = useState("")
  return (
    <div
      css={`
        flex-grow: 1;
      `}
    >
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
        <FilterButton arrow="▼" category={category}>
          {label}
        </FilterButton>
        <ListboxPopover
          css={`
            background: ${colors[NEGATIVE].altBackground};
            max-height: 24rem;
            overflow-y: scroll;
          `}
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
                    icon={<CloseIcon color={colors[NEGATIVE].text} />}
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
  category: PropTypes.string,
}

export default FilterMenu
