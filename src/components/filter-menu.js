import React from "react"

// TO DO: Replace options with data from query

const Filter = ({ label, options }) => (
  <optgroup label={label}>
    {options.map(o => (
      <option key={o.uuid} value={o.uuid}>
        {o.short_name}
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
          {
            uuid: "fc22fec0-77ff-4b9d-8c2c-4a7cefdd35cc",
            short_name: "Atmospheric Composition",
          },
          {
            uuid: "a8f44247-13c3-46b2-9963-e3d1cccf1348",
            short_name: "Weather",
          },
          {
            uuid: "293b5d7e-d182-4a19-8be1-dfb7626362b7",
            short_name: "Climate Variability & Change",
          },
          {
            uuid: "fc6199ea-4323-4899-b081-b4026983f3e3",
            short_name: "Global Water & Energy Cycle",
          },
          {
            uuid: "e8a9e6e3-0fc6-4d16-837f-7d885bdcc016",
            short_name: "Carbon Cycle & Ecosystems",
          },
          {
            uuid: "1ce35e3a-723d-4c79-b0f4-76286cab4ba6",
            short_name: "Earth Surface & Interior",
          },
          {
            uuid: "2a876a2f-2bea-461f-8976-3f450728e0d6",
            short_name: "NID",
          },
        ]}
      />
      <Filter
        id="season"
        label="Season"
        options={[
          {
            uuid: "6e8b9fb7-e805-491b-b6be-c3223a62a242",
            short_name: "boreal winter",
          },
          {
            uuid: "97ad50f0-37ec-4917-986b-b720d5895cf2",
            short_name: "boreal spring",
          },
          {
            uuid: "fdf4db10-8466-4bab-82f8-9599e622f945",
            short_name: "boreal summer",
          },
          {
            uuid: "0198f409-bc3d-4043-87c7-adda18173191",
            short_name: "boreal fall",
          },
          {
            uuid: "19db88e6-da8a-48f6-9daf-b9203e75d462",
            short_name: "austral winter",
          },
          {
            uuid: "2f6f8fbd-842e-436f-8111-b3cdb01d34f5",
            short_name: "austral spring",
          },
          {
            uuid: "7009a379-7232-4a95-a38b-0084ae63cca9",
            short_name: "austral summer",
          },
          {
            uuid: "06ada3ef-41d2-4a7c-86f9-e3930f3134ee",
            short_name: "austral fall",
          },
          {
            uuid: "58d71338-eb64-47e2-ab50-7e4e47f0152b",
            short_name: "monsoon",
          },
          {
            uuid: "1cf83bf0-487c-46b5-b122-09cc89c7d8c4",
            short_name: "break",
          },
          {
            uuid: "ecffb48b-8e73-40ae-88e7-ae77f7cf1f4f",
            short_name: "dry",
          },
          {
            uuid: "14be471a-9934-47cf-a317-282175ca9cb2",
            short_name: "wet",
          },
          {
            uuid: "2e302fe8-d766-4330-b1c1-c8efc7c6aabb",
            short_name: "warm",
          },
          {
            uuid: "e00b1389-10c9-4730-99a0-ac61c381b572",
            short_name: "cold",
          },
          {
            uuid: "5ce176db-f6cb-48eb-9eb6-3a6381538c3a",
            short_name: "equatorial",
          },
          {
            uuid: "f8e3887e-5fe8-4f88-901a-7faa08a2fbb1",
            short_name: "year round",
          },
          {
            uuid: "eeaf0996-8a56-4530-96b2-4f9495a8ca82",
            short_name: "NID",
          },
        ]}
      />
    </select>
  )
}

export default FilterMenu
