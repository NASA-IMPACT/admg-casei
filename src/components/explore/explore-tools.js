import React from "react"
import PropTypes from "prop-types"

import FilterMenu from "./filter-menu"
import Searchbar from "./searchbar"
import theme from "../../utils/theme"

const ExploreTools = React.forwardRef(
  (
    {
      submitSearch,
      resestSearch,
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
        onReset={resestSearch}
        style={{
          display: `flex`,
          margin: `2rem 0`,
          flexFlow: `column wrap`,
          border: `1px solid ${theme.color.base}`,
        }}
        data-cy="explore-tools"
      >
        <div style={{ display: `flex` }}>
          {/* <FilterMenu
            selectedFilterIds={selectedFilterIds}
            addFilter={addFilter}
            removeFilter={removeFilter}
            label={category}
            options={[{ id: "campaigns", shortname: "campaigns" }]}
          /> */}

          <Searchbar ref={ref} />
        </div>

        <div style={{ flexGrow: 1, display: `flex`, alignContent: `stretch` }}>
          {category === "campaigns" && (
            <>
              <FilterMenu
                id="focus"
                style={{ flexGrow: 1 }}
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Focus Area"
                options={getFilterOptionsById("focus")}
              />
              <FilterMenu
                id="geophysical"
                style={{ flexGrow: 1 }}
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Geophysical Concept"
                options={getFilterOptionsById("geophysical")}
              />
              <FilterMenu
                id="season"
                style={{ flexGrow: 1 }}
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Season"
                options={getFilterOptionsById("season")}
              />
              <FilterMenu
                id="region"
                style={{ flexGrow: 1 }}
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Geographical Region"
                options={getFilterOptionsById("region")}
              />
              <FilterMenu
                id="platform"
                style={{ flexGrow: 1 }}
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Platform"
                options={getFilterOptionsById("platform")}
              />
              <FilterMenu
                id="funding"
                style={{ flexGrow: 1 }}
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
              style={{ flexGrow: 1 }}
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
                style={{ flexGrow: 1 }}
                selectedFilterIds={selectedFilterIds}
                addFilter={addFilter}
                removeFilter={removeFilter}
                label="Measurement Type"
                options={getFilterOptionsById("type")}
              />
              <FilterMenu
                id="vertical"
                style={{ flexGrow: 1 }}
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
