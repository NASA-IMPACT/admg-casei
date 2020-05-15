import React from "react"

const Filter = ({ label, options }) => (
  <optgroup label={label}>
    {options.map(o => (
      <option key={o.id} value={o.id}>
        {o.shortname}
      </option>
    ))}
  </optgroup>
)

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
      style={{ flexGrow: 0, maxHeight: `2.25rem`, maxWidth: `5rem` }}
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

export default FilterMenu
