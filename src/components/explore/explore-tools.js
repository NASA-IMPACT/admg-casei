import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import FilterByTextInput from "./filter-by-textinput"
import FilterByDate from "./filter-by-date"

import { FilterIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import DropdownByTextInput from "./filter-text-dropdown"

const ExploreTools = React.forwardRef(
  (
    {
      dateRange,
      setDateRange,
      setSearchResult,
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
      <div>
        <form
          onSubmit={e => e.preventDefault()}
          onReset={resetSearch}
          css={`
            display: flex;
            margin: 2rem 0 1rem 0;
            flex-wrap: wrap;
            align-content: stretch;
            border: 1px solid ${colors[NEGATIVE].text};
          `}
          data-cy="explore-tools"
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
            <>
              <FilterByTextInput
                ref={ref}
                setSearchResult={setSearchResult}
                category={category}
              />

              <FilterByDate
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

              <button
                css={`
                  flex-grow: 1;
                  border: 1px solid ${colors[NEGATIVE].text};
                  padding: 0.25rem;

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
            </>
          )}

          {category === "products" && (
            <>
              <DropdownByTextInput
                setSearchResult={setSearchResult}
                id="type"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="gcmd"
                options={getFilterOptionsById("measurement")}
                secondaryOptions={getFilterOptionsById("gcmd")}
                category={category}
                placeholder={"Search for a measurement variable"}
                getMatchTerm={option => option.shortname}
                getFilterOptions={getGcmdOptions}
                filterValue={option => option.shortname}
                filterLayoutWidth={"60%"}
                hasLinkOut={true}
              />
              <FilterMenu
                id="style"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Measurement Styles"
                options={getFilterOptionsById("style")}
                category={category}
              />
              <DropdownByTextInput
                setSearchResult={setSearchResult}
                id="type"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Measurement Types"
                options={getFilterOptionsById("measurement")}
                secondaryOptions={getFilterOptionsById("related")}
                category={category}
                placeholder={
                  "Search for related campaigns, instruments, or platforms"
                }
                getMatchTerm={option =>
                  `${[option.shortname, `(${option.type})`]
                    .filter(item => item !== "")
                    .join(" ")}`
                }
                getFilterOptions={getRelatedOptions}
                filterValue={option =>
                  `${[option.shortname, `(${option.type})`]
                    .filter(item => item !== "")
                    .join(" ")}`
                }
                filterLayoutWidth={"40%"}
              />
              <FilterByDate
                id="date"
                label="Date range"
                dateRange={dateRange}
                setDateRange={setDateRange}
              />

              <FilterMenu
                id="type"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Measurement Types"
                options={getFilterOptionsById("measurement")}
                category={category}
              />
              <FilterMenu
                id="vertical"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Vertical Measurement Region"
                options={getFilterOptionsById("vertical")}
              />

              <button
                css={`
                  flex-grow: 1;
                  border: 1px solid ${colors[NEGATIVE].text};
                  padding: 0.25rem;

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
            </>
          )}

          {category === "platforms" && (
            <>
              {" "}
              <FilterByTextInput
                ref={ref}
                setSearchResult={setSearchResult}
                category={category}
              />
              <FilterMenu
                id="instrument"
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Instrument"
                options={getFilterOptionsById("instrument")}
              />
            </>
          )}
          {category === "instruments" && (
            <>
              <FilterByTextInput
                ref={ref}
                setSearchResult={setSearchResult}
                category={category}
              />
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
        </form>

        <p
          css={`
            font-size: 90%;
          `}
        >
          CASEI&apos;s metadata inventory is constantly being updated. If
          content is unavailable, we may be currently working on it and it will
          be available once reviewed.
        </p>
      </div>
    )
  }
)

const getGcmdOptions = (values, term) => {
  return values.filter(
    option =>
      option.term.toLowerCase().startsWith(term.toLowerCase()) ||
      option.variable_1.toLowerCase().startsWith(term.toLowerCase()) ||
      option.variable_2.toLowerCase().startsWith(term.toLowerCase()) ||
      option.variable_3.toLowerCase().startsWith(term.toLowerCase()) ||
      `${[
        option.term.toLowerCase(),
        option.variable_1 ? option.variable_1.toLowerCase() : "",
        option.variable_2 ? option.variable_2.toLowerCase() : "",
        option.variable_3 ? option.variable_3.toLowerCase() : "",
      ]
        .filter(item => item !== "")
        .join(" > ")}`
        .toLocaleLowerCase()
        .startsWith(term.toLowerCase())
  )
}

function getRelatedOptions(values, term) {
  return values.filter(option =>
    option.shortname.toLowerCase().startsWith(term.toLowerCase())
  )
}

ExploreTools.propTypes = {
  dateRange: PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
  }),
  setDateRange: PropTypes.func,
  setSearchResult: PropTypes.func.isRequired,
  resetSearch: PropTypes.func.isRequired,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  getFilterOptionsById: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  category: PropTypes.oneOf([
    "campaigns",
    "platforms",
    "instruments",
    "products",
  ]).isRequired,
  toggleMap: PropTypes.func,
  isDisplayingMap: PropTypes.bool,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
ExploreTools.displayName = "ExploreTools"

export default ExploreTools
