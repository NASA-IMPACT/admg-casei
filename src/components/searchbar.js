import React from "react"

import FilterMenu from "./filter-menu"
import FilterChip from "./filter-chip"

const Searchbar = ({
  filterOptions,
  selectedFilterIds,
  addFilter,
  removeFilter,
  sortOrder,
  toggleSortOrder,
}) => {
  const getFilterLabelById = id => {
    for (let [key, value] of Object.entries(filterOptions)) {
      const filter = value.options.find(i => i.id === id)
      if (filter) return `${key}: ${filter.shortname}`
    }
  }
  return (
    <form
      onSubmit={e => e.preventDefault()}
      style={{ display: `flex`, margin: `2rem 0` }}
      data-cy="searchbar"
    >
      <FilterMenu
        filterOptions={filterOptions}
        selectedFilterIds={selectedFilterIds}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          boxShadow: `0 -1px 1px 0 rgba(68,63,63,0.08), 0 2px 6px 0 rgba(68,63,63,0.08)`,
          borderRadius: `0.25rem`,
          padding: "0.25rem",
        }}
      >
        <div style={{ display: `flex`, flexWrap: `wrap` }}>
          {selectedFilterIds.map(f => (
            <FilterChip
              key={f}
              id={f}
              label={getFilterLabelById(f)}
              removeFilter={removeFilter}
            />
          ))}
        </div>
        <input
          aria-label="Enter search text"
          name="search"
          placeholder="Enter text..."
          style={{ border: "none", flexGrow: 1 }}
          type="text"
        />
        <button
          type="button"
          style={{ border: "none", flexGrow: 0 }}
          data-cy="submit"
        >
          <span
            role="img"
            aria-label="m
        Magnifying glass icon"
          >
            🔍
          </span>
        </button>
      </div>
      <select
        defaultValue={sortOrder}
        aria-label="Select sort order"
        name="sort"
        id="sort-select"
        onChange={e => toggleSortOrder(e.target.value)}
        style={{ height: `2.25rem` }}
        data-cy="sort-select"
      >
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>
    </form>
  )
}

export default Searchbar
