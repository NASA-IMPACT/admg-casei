import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { selector } from "../../utils/filter-utils"
import useInstrumentList from "../../utils/use-instrument-list"

import ExploreLayout from "../../components/explore/explore-layout"
import ExploreTools from "../../components/explore/explore-tools"
import FilterChips from "../../components/filter/filter-chips"
import Chip from "../../components/chip"
import SortMenu from "../../components/explore/sort-menu"
import ExploreSection from "../../components/explore/explore-section"
import InstrumentCard from "../../components/cards/instrument-card"

export default function ExploreInstruments({ data, location }) {
  const {
    allInstrument,
    allMeasurementType,
    allMeasurementStyle,
    allMeasurementRegion,
    allCampaign,
    allPlatform,
    allDoi,
  } = data
  const { selectedFilterId } = location.state || {}

  const [sortOrder, setSortOrder] = useState("a to z")
  const [selectedFilterIds, setFilter] = useState([])

  const [searchResult, setSearchResult] = useState(null)

  useEffect(() => {
    // update based on passed state
    if (selectedFilterId) setFilter([selectedFilterId]) // applying only this one selection as filter
    return () => {
      // cleanup
      setFilter([])
    }
  }, [selectedFilterId])

  const instrumentList = useInstrumentList(
    allInstrument.list,
    sortOrder,
    selectedFilterIds,
    searchResult
  )

  const addFilter = id => setFilter([...selectedFilterIds, id])

  const removeFilter = id => setFilter(selectedFilterIds.filter(f => f !== id))

  const clearFilters = () => {
    setFilter([])
    setSearchResult(null)
  }

  const inputElement = useRef(null)

  const resetSearch = () => {
    setSearchResult(null)
  }

  const { getFilterLabelById, getFilterOptionsById } = selector({
    type: allMeasurementType,
    style: allMeasurementStyle,
    vertical: allMeasurementRegion,
    platform: allPlatform,
  })

  return (
    <ExploreLayout
      filteredCount={{
        campaigns: allCampaign.totalCount,
        platforms: allPlatform.totalCount,
        instruments: instrumentList.filtered.length,
        products: allDoi?.totalCount,
      }}
      category={"instruments"}
    >
      <ExploreTools
        ref={inputElement}
        setSearchResult={setSearchResult}
        resetSearch={resetSearch}
        selectedFilterIds={selectedFilterIds}
        addFilter={addFilter}
        getFilterOptionsById={getFilterOptionsById}
        removeFilter={removeFilter}
        category={"instruments"}
      />
      {selectedFilterIds.length > 0 && (
        <>
          <FilterChips clearFilters={clearFilters}>
            {selectedFilterIds.map(f => (
              <Chip
                key={f}
                id="filter"
                label={getFilterLabelById ? getFilterLabelById(f) : f}
                actionId={f}
                removeAction={removeFilter}
              />
            ))}
          </FilterChips>
          <hr
            css={`
              background: ${colors[NEGATIVE].division};
            `}
          />
        </>
      )}
      <div
        css={`
          display: flex;
          flex-direction: row-reverse;
          justify-content: space-between;
          align-items: baseline;
        `}
      >
        <SortMenu
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          category={"instruments"}
        />
      </div>

      <ExploreSection
        list={instrumentList.filtered}
        card={{ component: InstrumentCard }}
      />
    </ExploreLayout>
  )
}

export const query = graphql`
  query {
    allInstrument(sort: { fields: [short_name], order: ASC }) {
      totalCount
      list: nodes {
        ...instrumentFields
      }
    }
    allMeasurementType {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allMeasurementStyle {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allPlatform {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allMeasurementRegion {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allCampaign {
      totalCount
    }
    allPlatform {
      totalCount
    }
    allDoi {
      totalCount
    }
  }

  fragment instrumentFields on instrument {
    shortname: short_name # required for sort
    longname: long_name # required for filter by text
    id
    measurementType: measurement_type {
      id # required for filter
    }
    measurementStyle: measurement_style {
      id # required for filter
    }
    platforms: platforms {
      id
    }
    measurementRegions: measurement_regions {
      id # required for filter
    }
    campaigns {
      id # required for sort
    }
  }
`

const instrumentShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  measurementType: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  measurementStyle: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ),
  measurementRegions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
})

const filterOptionShape = PropTypes.shape({
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
}).isRequired

ExploreInstruments.propTypes = {
  data: PropTypes.shape({
    allInstrument: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(instrumentShape).isRequired,
    }),
    allMeasurementType: filterOptionShape,
    allMeasurementStyle: filterOptionShape,
    allMeasurementRegion: filterOptionShape,
    allCampaign: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
    allDoi: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
    allPlatform: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedFilterId: PropTypes.string,
    }),
  }),
}
