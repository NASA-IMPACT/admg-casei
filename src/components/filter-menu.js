import React from "react"
import PropTypes from "prop-types"

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
  filterOptions,
  selectedFilterIds,
  addFilter,
  removeFilter,
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
        border: `1px solid hsla(0,0%,100%,0.9)`,
        borderRadius: `2px 0 0 2px`,
        color: `hsla(0,0%,100%,0.9)`,
        padding: `0.5rem`,
      }}
      data-cy="filter-select"
      onChange={e => handleSelection(e.target.value)}
    >
      <option value="">Filter</option>
      <Filter
        id="focus"
        label="Focus Area"
        options={filterOptions.focus.options}
      />
      <Filter
        id="season"
        label="Season"
        options={filterOptions.season.options}
      />
    </select>
  )
}

FilterMenu.propTypes = {
  filterOptions: PropTypes.shape({
    focus: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          shortname: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }),
    season: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          shortname: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }),
  }).isRequired,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
}

export default FilterMenu
