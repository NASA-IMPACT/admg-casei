import React from "react"
import PropTypes from "prop-types"

import TrashIcon from "../icons/trash-icon"
import IconButton from "../icon-button"
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
          <div
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              margin: `2rem 0`,
              alignItems: `center`,
            }}
          >
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
            {selectedFilterIds.length > 1 && (
              <IconButton
                id="clear-filters"
                action={() => clearFilters()}
                icon={<TrashIcon />}
              />
            )}
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
