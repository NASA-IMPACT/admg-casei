import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import FilterByTextInput from "./filter-by-textinput"
import DateMenu from "./date-menu"

import { FilterIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { breakpoints } from "../../theme"

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
        onSubmit={e => e.preventDefault()}
        onReset={resetSearch}
        css={`
          display: flex;
          margin: 2rem 0;
          flex-flow: column wrap;
          border: 1px solid ${colors[NEGATIVE].text};
        `}
        data-cy="explore-tools"
      >
        <div
          css={`
            display: flex;
          `}
        >
          <FilterByTextInput
            ref={ref}
            submitSearch={submitSearch}
            category={category}
          />
          {category === "campaigns" && (
            <div
              css={`
                border: 1px solid ${colors[NEGATIVE].text};
                padding: 0.25rem;
              `}
            >
              <button
                css={`
                  border: none;
                  flex-grow: 0;
                  background: transparent;
                  color: ${colors[NEGATIVE].text};
                  vertical-align: middle;
                  cursor: pointer;
                `}
                data-cy="map-toggle-btn"
                onClick={e => {
                  e.preventDefault()
                  toggleMap(!isDisplayingMap)
                }}
              >
                <span>{isDisplayingMap ? "Hide" : "Show"} Map</span>
              </button>
            </div>
          )}
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
              border: 1px solid ${colors[NEGATIVE].text};
              display: flex;
              align-items: center;
              gap: 0.55rem;
            `}
            data-cy="main-filter-label"
          >
            <FilterIcon color={colors[NEGATIVE].text} />
            <strong>Filter By</strong>
          </div>

          {category === "campaigns" && (
            <div
              css={`
                display: inherit;
                flex-grow: 1;
                @media screen and (max-width: ${breakpoints["sm"]}) {
                  display: block;
                }
              `}
            >
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
                category={category}
              />
              <FilterMenu
                id="geophysical"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Geophysical Concept"
                options={getFilterOptionsById("geophysical")}
                category={category}
              />
              <FilterMenu
                id="season"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Season"
                options={getFilterOptionsById("season")}
                category={category}
              />
              <FilterMenu
                id="region"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Geographical Region"
                options={getFilterOptionsById("region")}
                category={category}
              />
              <FilterMenu
                id="platform"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Platform"
                options={getFilterOptionsById("platform")}
                category={category}
              />
              <FilterMenu
                id="funding"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Funding Agency"
                options={getFilterOptionsById("funding")}
                category={category}
              />
            </div>
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
                label="Vertical Measurement Region"
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
