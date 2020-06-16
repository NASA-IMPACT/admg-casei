import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import FilterChip from "./filter-chip"
import theme from "../utils/theme"

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

SearchIcon.propTypes = {
  color: PropTypes.string,
}

const Searchbar = React.forwardRef(
  (
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
              border: `1px solid ${theme.type.base.color}`,
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
                color: theme.type.base.color,
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
                color: theme.type.base.color,
                verticalAlign: `middle`,
              }}
              data-cy="submit"
            >
              <span role="img" aria-label="Magnifying glass icon">
                <SearchIcon color={theme.type.base.color} />
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
              WebkitAppearance: `none`,
              background: `transparent`,
              border: `1px solid ${theme.type.base.color}`,
              borderRadius: `0 ${theme.shape.rounded} ${theme.shape.rounded} 0`,
              color: theme.type.base.color,
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
)

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

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
Searchbar.displayName = "Searchbar"

export default Searchbar
