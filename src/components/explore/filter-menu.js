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

const Filter = ({ label, options, selectedFilterIds }) => (
  <>
    <strong>{label}</strong>
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
  </>
)

Filter.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
    })
  ).isRequired,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const FilterMenu = ({
  selectedFilterIds,
  addFilter,
  getFilterOptionsById,
  removeFilter,
  category,
}) => {
  const handleSelection = value => {
    selectedFilterIds.includes(value) ? removeFilter(value) : addFilter(value)
    setValue("")
  }

  let [value, setValue] = useState("")
  return (
    <>
      <VisuallyHidden id="filter-select">
        filter results by sub-categories
      </VisuallyHidden>
      <ListboxInput
        name="filter"
        aria-labelledby="filter-select"
        value={value}
        data-cy="filter-select"
        onChange={value => handleSelection(value)}
      >
        <ListboxButton
          arrow="▼"
          style={{
            flexGrow: 0,
            height: `2.5rem`,
            maxWidth: `5rem`,
            WebkitAppearance: `none`,
            background: `transparent`,
            border: `1px solid ${theme.color.base}`,
            borderRadius: `${theme.shape.rounded} 0 0 ${theme.shape.rounded}`,
            color: theme.color.base,
            padding: `0.5rem`,
            cursor: `pointer`,
          }}
        >
          Filter
        </ListboxButton>
        <ListboxPopover
          style={{
            background: theme.color.primary,
            maxHeight: `24rem`,
            overflowY: `scroll`,
          }}
        >
          <ListboxList data-cy="filter-options">
            {category === "campaigns" && (
              <>
                <Filter
                  id="focus"
                  label="Focus Area"
                  options={getFilterOptionsById("focus")}
                  selectedFilterIds={selectedFilterIds}
                />
                <Filter
                  id="geophysical"
                  label="Geophysical Concept"
                  options={getFilterOptionsById("geophysical")}
                  selectedFilterIds={selectedFilterIds}
                />
                <Filter
                  id="season"
                  label="Season"
                  options={getFilterOptionsById("season")}
                  selectedFilterIds={selectedFilterIds}
                />
                <Filter
                  id="region"
                  label="Geographical Region"
                  options={getFilterOptionsById("region")}
                  selectedFilterIds={selectedFilterIds}
                />
                <Filter
                  id="platform"
                  label="Platform"
                  options={getFilterOptionsById("platform")}
                  selectedFilterIds={selectedFilterIds}
                />
                <Filter
                  id="funding"
                  label="Funding Agency"
                  options={getFilterOptionsById("funding")}
                  selectedFilterIds={selectedFilterIds}
                />
              </>
            )}
            {category === "platforms" && (
              <Filter
                id="instrument"
                label="Instrument"
                options={getFilterOptionsById("instrument")}
                selectedFilterIds={selectedFilterIds}
              />
            )}
            {category === "instruments" && (
              <>
                <Filter
                  id="measurement-types"
                  label="Measurement Types"
                  options={getFilterOptionsById("type")}
                  selectedFilterIds={selectedFilterIds}
                />
                <Filter
                  id="measurement-regions"
                  label="Measurement Regions"
                  options={getFilterOptionsById("vertical")}
                  selectedFilterIds={selectedFilterIds}
                />
              </>
            )}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </>
  )
}

FilterMenu.propTypes = {
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  getFilterOptionsById: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
}

export default FilterMenu
