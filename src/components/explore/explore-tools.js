import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import Searchbar from "./searchbar"
import Chip from "../chip"
import SortMenu from "./sort-menu"

const ClearIcon = ({ color = "#FFF" }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
  >
    <rect width="16px" height="16px" id="icon-bound" fill="none" />
    <path
      fill={color}
      d="M11,5h2v8.5c0,0.825-0.675,1.5-1.5,1.5h-7C3.675,15,3,14.325,3,13.5V5h2v8h2V5h2v8h2V5z M2,2h12v2H2V2z M6,0h4v1H6V0z"
    />
  </svg>
)

ClearIcon.propTypes = {
  color: PropTypes.string,
}

const ExploreTools = React.forwardRef(
  (
    {
      submitSearch,
      selectedFilterIds,
      addFilter,
      getFilterLabelById,
      getFilterOptionsById,
      removeFilter,
      clearFilters,
      sortOrder,
      setSortOrder,
      category,
    },
    ref
  ) => {
    return (
      <>
        <form
          onSubmit={submitSearch}
          style={{ display: `flex`, margin: `2rem 0` }}
          data-cy="explore-tools"
        >
          <FilterMenu
            selectedFilterIds={selectedFilterIds}
            addFilter={addFilter}
            getFilterOptionsById={getFilterOptionsById}
            removeFilter={removeFilter}
            category={category}
          />

          <Searchbar ref={ref} />

          <SortMenu
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            category={category}
          />
        </form>

        {selectedFilterIds.length > 0 && (
          <div style={{ display: `flex`, flexWrap: `wrap`, margin: `2rem 0` }}>
            Active filters:
            {selectedFilterIds.map(f => (
              <Chip
                key={f}
                actionId={f}
                id="filter"
                label={getFilterLabelById(f)}
                chipAction={removeFilter}
              />
            ))}
            <button
              type="button"
              onClick={() => clearFilters()}
              style={{
                background: "none",
                border: "none",
                flexGrow: 0,
                cursor: `pointer`,
                // color: theme.color.base,
                verticalAlign: `middle`,
                marginLeft: `0.5rem`,
              }}
              data-cy="remove-filter"
            >
              <span role="img" aria-label="clear-icon">
                <ClearIcon />
              </span>
            </button>
          </div>
        )}
      </>
    )
  }
)

ExploreTools.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  getFilterLabelById: PropTypes.func.isRequired,
  getFilterOptionsById: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
ExploreTools.displayName = "ExploreTools"

export default ExploreTools
