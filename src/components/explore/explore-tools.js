import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import Searchbar from "./searchbar"
import Chip from "../chip"
import SortMenu from "./sort-menu"

const ExploreTools = React.forwardRef(
  (
    {
      submitSearch,
      selectedFilterIds,
      addFilter,
      getFilterLabelById,
      getFilterOptionsById,
      removeFilter,
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

          <SortMenu sortOrder={sortOrder} setSortOrder={setSortOrder} />
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
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
ExploreTools.displayName = "ExploreTools"

export default ExploreTools
