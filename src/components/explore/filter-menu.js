import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import "@reach/listbox/styles.css"
import VisuallyHidden from "@reach/visually-hidden"

import theme from "../../utils/theme"

const Filter = ({ label, options }) => (
  <>
    <strong>{label}</strong>
    {options.map(o => (
      <ListboxOption key={o.id} value={o.id}>
        {o.shortname}
      </ListboxOption>
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
      <VisuallyHidden aria-labelledby="filter-select">Filter</VisuallyHidden>
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
          <ListboxList>
            {category === "campaigns" && (
              <>
                <Filter
                  id="focus"
                  label="Focus Area"
                  options={getFilterOptionsById("focus")}
                />
                <Filter
                  id="geophysical"
                  label="Geophysical Concept"
                  options={getFilterOptionsById("geophysical")}
                />
                <Filter
                  id="season"
                  label="Season"
                  options={getFilterOptionsById("season")}
                />
                <Filter
                  id="region"
                  label="Geographical Region"
                  options={getFilterOptionsById("region")}
                />
                <Filter
                  id="platform"
                  label="Platform"
                  options={getFilterOptionsById("platform")}
                />
              </>
            )}
            {category === "platforms" && (
              <Filter
                id="instrument"
                label="Instrument"
                options={getFilterOptionsById("instrument")}
              />
            )}
            {category === "instruments" && (
              <Filter
                id="instrument-types"
                label="Instrument Types"
                options={getFilterOptionsById("type")}
              />
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
