import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import FilterChip from "./filter-chip"

// TODO: figure out how to import and use collecticons directly
const SearchIcon = ({ color = "#FFF" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <rect width="16" height="16" fill="none" />
    <path
      fill={color}
      d="M15.708,13.587l-3.675-3.675C12.646,8.92,13,7.751,13,6.5C13,2.91,10.09,0,6.5,0S0,2.91,0,6.5S2.91,13,6.5,13 c1.251,0,2.42-0.354,3.412-0.967l3.675,3.675c0.389,0.389,1.025,0.389,1.414,0l0.707-0.707 C16.097,14.612,16.097,13.976,15.708,13.587z M3.318,9.682C2.468,8.832,2,7.702,2,6.5s0.468-2.332,1.318-3.182S5.298,2,6.5,2 s2.332,0.468,3.182,1.318C10.532,4.168,11,5.298,11,6.5s-0.468,2.332-1.318,3.182C8.832,10.532,7.702,11,6.5,11 S4.168,10.532,3.318,9.682z"
    />
  </svg>
)

const Searchbar = (
  {
    submitSearch,
    filterOptions,
    selectedFilterIds,
    addFilter,
    removeFilter,
    sortOrder,
    toggleSortOrder,
  },
  ref
) => {
  const getFilterLabelById = id => {
    for (let [key, value] of Object.entries(filterOptions)) {
      const filter = value.options.find(i => i.id === id)
      if (filter) return `${key}: ${filter.shortname}`
    }
  }
  return (
    <>
      <form
        onSubmit={submitSearch}
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
            border: `1px solid hsla(0,0%,100%,0.9)`,
            borderLeft: 0,
            borderRight: 0,
            borderRadius: `0`,
            padding: "0.25rem",
          }}
        >
          <input
            autoComplete="off"
            aria-label="Enter search text"
            name="search"
            placeholder="Enter text..."
            style={{
              border: "none",
              flexGrow: 1,
              background: `transparent`,
              color: `hsla(0,0%,100%,0.9)`,
            }}
            type="text"
            ref={ref}
          />
          <button
            type="submit"
            style={{
              border: "none",
              flexGrow: 0,
              background: `transparent`,
              color: `hsla(0,0%,100%,0.9)`,
              verticalAlign: `middle`,
            }}
            data-cy="submit"
          >
            <span role="img" aria-label="Magnifying glass icon">
              <SearchIcon />
            </span>
          </button>
        </div>

        <select
          defaultValue={sortOrder}
          aria-label="Select sort order"
          name="sort"
          id="sort-select"
          onChange={e => toggleSortOrder(e.target.value)}
          style={{
            height: `2.5rem`,
            "-webkit-appearance": `none`,
            background: `transparent`,
            border: `1px solid hsla(0,0%,100%,0.9)`,
            borderRadius: `0 2px 2px 0`,
            color: `hsla(0,0%,100%,0.9)`,
            padding: `0.5rem`,
          }}
          data-cy="sort-select"
        >
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
      </form>

      {selectedFilterIds.length > 0 && (
        <div style={{ display: `flex`, flexWrap: `wrap`, margin: `2rem 0` }}>
          Active filters:
          {selectedFilterIds.map(f => (
            <FilterChip
              key={f}
              id={f}
              label={getFilterLabelById(f)}
              removeFilter={removeFilter}
            />
          ))}
        </div>
      )}
    </>
  )
}

Searchbar.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  filterOptions: PropTypes.shape({
    focus: PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
    }),
    season: PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
    }),
  }).isRequired,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  toggleSortOrder: PropTypes.func.isRequired,
}

export default React.forwardRef(Searchbar)
