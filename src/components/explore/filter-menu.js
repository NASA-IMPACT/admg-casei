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

import { IconButton } from "../button"
import { CloseIcon } from "../../icons"
import { colors } from "../../utils/theme"

const FilterButton = styled(ListboxButton)`
  flex-grow: 0;
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  border: 1px solid ${colors.darkTheme.text};
  color: ${colors.darkTheme.text};
  padding: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  @media screen and (max-width: 1400px) {
    height: 2.5rem;
  }
  @media screen and (max-width: 1280px) {
    height: 4.5rem;
  }
`

const FilterItem = styled(ListboxOption)`
  display: flex;
  justify-content: space-between;
  background-color: ${props =>
    props.selected
      ? colors.darkTheme.background
      : colors.darkTheme.altBackground};

  &[data-reach-listbox-option][aria-selected="true"] {
    background: ${colors.darkTheme.background};
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
}) => {
  const handleSelection = value => {
    selectedFilterIds.includes(value) ? removeFilter(value) : addFilter(value)
    setValue("")
  }

  let [value, setValue] = useState("")
  return (
    <div
      css={`
        flex-grow: 0;
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
        <FilterButton arrow="▼">{label}</FilterButton>
        <ListboxPopover
          css={`
            background: ${colors.darkTheme.altBackground};
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
                    icon={<CloseIcon color={colors.darkTheme.text} />}
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
}

export default FilterMenu
