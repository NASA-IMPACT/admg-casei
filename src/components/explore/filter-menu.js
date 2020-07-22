import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

const Filter = ({ label, options }) => (
  <optgroup label={label}>
    {options.map(o => (
      <option key={o.id} value={o.id}>
        {o.shortname}
      </option>
    ))}
  </optgroup>
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
    document.getElementById("filter-select").value = ""
  }
  return (
    <select
      aria-label="Select filters"
      name="filter"
      id="filter-select"
      style={{
        flexGrow: 0,
        height: `2.5rem`,
        maxWidth: `5rem`,
        WebkitAppearance: `none`,
        background: `transparent`,
        border: `1px solid ${theme.type.base.color}`,
        borderRadius: `${theme.shape.rounded} 0 0 ${theme.shape.rounded}`,
        color: theme.type.base.color,
        padding: `0.5rem`,
      }}
      data-cy="filter-select"
      onChange={e => handleSelection(e.target.value)}
    >
      <option value="">Filter</option>
      {category === "campaigns" && (
        <>
          <Filter
            id="focus"
            label="Focus Area"
            options={getFilterOptionsById("focus")}
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
        <>
          <Filter
            id="instrument"
            label="Instrument"
            options={getFilterOptionsById("instrument")}
          />
        </>
      )}
      {category === "instruments" && (
        <>
          <Filter
            id="instrument-types"
            label="Instrument Types"
            options={getFilterOptionsById("type")}
          />
        </>
      )}
    </select>
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
