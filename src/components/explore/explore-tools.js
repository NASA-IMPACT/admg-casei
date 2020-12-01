import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import Searchbar from "./searchbar"

const ExploreTools = React.forwardRef(
  (
    {
      submitSearch,
      selectedFilterIds,
      addFilter,
      getFilterOptionsById,
      removeFilter,
      category,
    },
    ref
  ) => {
    return (
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
      </form>
    )
  }
)

ExploreTools.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  getFilterOptionsById: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
ExploreTools.displayName = "ExploreTools"

export default ExploreTools
