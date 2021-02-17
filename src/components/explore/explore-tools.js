import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import Searchbar from "./searchbar"
import DateMenu from "./date-menu"
import { FilterIcon } from "../../icons"
import { colors } from "../../utils/theme"

const ExploreTools = React.forwardRef(
  (
    {
      dateRange,
      setDateRange,
      submitSearch,
      resetSearch,
      selectedFilterIds,
      addFilter,
      getFilterOptionsById,
      removeFilter,
      category,
      toggleMap,
      isDisplayingMap,
    },
    ref
  ) => {
    return (
      <form
        onSubmit={submitSearch}
        onReset={resetSearch}
        css={`
          display: flex;
          margin: 2rem 0;
          flex-flow: column wrap;
          border: 1px solid ${colors.darkTheme.text};
        `}
        data-cy="explore-tools"
      >
        <div
          css={`
            display: flex;
          `}
        >
          <Searchbar
            ref={ref}
            toggleMap={toggleMap}
            isDisplayingMap={isDisplayingMap}
          />
        </div>

        <div
          css={`
            flex-grow: 1;
            display: flex;
            align-content: stretch;
          `}
        >
          <div
            css={`
              padding: 0.25rem 0.75rem;
              border: 1px solid ${colors.darkTheme.text};
              display: flex;
              align-items: center;
              gap: 0.5rem;
            `}
            data-cy="main-filter-label"
          >
            <FilterIcon color={colors.darkTheme.text} />
            <strong>Filter By</strong>
          </div>

          {category === "campaigns" && (
            <>
              <DateMenu
                id="date"
                label="Date range"
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              <FilterMenu
                id="focus"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Focus Area"
                options={getFilterOptionsById("focus")}
              />
              <FilterMenu
                id="geophysical"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Geophysical Concept"
                options={getFilterOptionsById("geophysical")}
              />
              <FilterMenu
                id="season"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Season"
                options={getFilterOptionsById("season")}
              />
              <FilterMenu
                id="region"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Geographical Region"
                options={getFilterOptionsById("region")}
              />
              <FilterMenu
                id="platform"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Platform"
                options={getFilterOptionsById("platform")}
              />
              <FilterMenu
                id="funding"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Funding Agency"
                options={getFilterOptionsById("funding")}
              />
            </>
          )}
          {category === "platforms" && (
            <FilterMenu
              id="instrument"
              selectedFilterIds={selectedFilterIds}
              addFilter={addFilter}
              removeFilter={removeFilter}
              label="Instrument"
              options={getFilterOptionsById("instrument")}
            />
          )}
          {category === "instruments" && (
            <>
              <FilterMenu
                id="type"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Measurement Type"
                options={getFilterOptionsById("type")}
              />
              <FilterMenu
                id="vertical"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Measurement Region"
                options={getFilterOptionsById("vertical")}
              />
            </>
          )}
        </div>
      </form>
    )
  }
)

ExploreTools.propTypes = {
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }).isRequired,
  setDateRange: PropTypes.func.isRequired,
  submitSearch: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  getFilterOptionsById: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
  toggleMap: PropTypes.func.isRequired,
  isDisplayingMap: PropTypes.bool.isRequired,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
ExploreTools.displayName = "ExploreTools"

export default ExploreTools
