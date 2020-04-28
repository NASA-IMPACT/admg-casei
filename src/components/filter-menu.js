import React from "react"

const Filter = ({
  id,
  label,
  name,
  options,
  filters,
  addFilter,
  removeFilter,
}) => {
  const handleSelection = (value) => {
    filters.includes(value) ? removeFilter(value) : addFilter(value)
    document.getElementById(id).value = ""
  }

  return (
    <li
      style={{
        display: `flex`,
        flexDirection: `column`,
        marginRight: `0.5rem`,
      }}
    >
      <select
        name={name}
        id={id}
        onChange={(e) => handleSelection(e.target.value)}
      >
        <option value="">--{label}--</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </li>
  )
}

const FilterMenu = ({ filters, addFilter, removeFilter }) => (
  <div
    style={{
      display: `flex`,
      flexDirection: `row`,
      justifyContent: `space-around`,
      alignItems: `baseline`,
      marginBottom: `2rem`,
    }}
  >
    <ul
      style={{
        display: `flex`,
        flexDirection: `row`,
        margin: 0,
        listStyle: `none`,
      }}
    >
      <Filter
        id="focus"
        label="Focus Area"
        name="focus"
        options={[
          "Atmospheric Composition",
          "Weather",
          "Climate Variability & Change",
          "Global Water & Energy Cycle",
          "Carbon Cycle & Ecosystems",
          "Earth Surface & Interior",
        ]}
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
      <Filter
        id="season"
        label="Season"
        name="season"
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
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
    </ul>
  </div>
)

export default FilterMenu
