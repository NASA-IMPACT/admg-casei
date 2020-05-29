import React from "react"

const Filter = ({ label, options }) => (
  <optgroup label={label}>
    {options.map(o => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </optgroup>
)

const FilterMenu = ({ filters, addFilter, removeFilter }) => {
  const handleSelection = value => {
    filters.includes(value) ? removeFilter(value) : addFilter(value)
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
        options={[
          "Atmospheric Composition",
          "Weather",
          "Climate Variability & Change",
          "Global Water & Energy Cycle",
          "Carbon Cycle & Ecosystems",
          "Earth Surface & Interior",
        ]}
      />
      <Filter
        id="season"
        label="Season"
        options={[
          "boreal winter",
          "boreal spring",
          "boreal summer",
          "boreal fall",
          "austral winter",
          "austral spring",
          "austral summer",
          "austral fall",
          "monsoon",
          "break",
          "dry",
          "wet",
          "warm",
          "cold",
          "equatorial",
          "year round",
        ]}
      />
    </select>
  )
}

export default FilterMenu
