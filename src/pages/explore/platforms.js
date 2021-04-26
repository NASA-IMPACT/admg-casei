import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import api from "../../utils/api"
import { NEGATIVE } from "../../utils/constants"
import { ArrowIcon } from "../../icons"
import { colors } from "../../theme"
import { selector } from "../../utils/filter-utils"
import usePlatformList from "../../utils/use-platform-list"

import ExploreLayout from "../../components/explore/explore-layout"
import ExploreTools from "../../components/explore/explore-tools"
import FilterChips from "../../components/filter/filter-chips"
import Chip from "../../components/chip"
import SortMenu from "../../components/explore/sort-menu"
import PlatformNav from "../../components/explore/platform-nav"
import ExploreSection from "../../components/explore/explore-section"
import PlatformCard from "../../components/cards/platform-card"

export default function ExplorePlatforms({ data, location }) {
  const { allCampaign, allPlatform, allInstrument } = data
  const { selectedFilterId } = location.state || {}

  const [isLoading, setLoading] = useState(false)

  const [sortOrder, setSortOrder] = useState({
    campaigns: "most recent",
    instruments: "most used",
    platforms: "most used",
  })

  const [selectedFilterIds, setFilter] = useState([])

  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    // update based on passed state
    if (selectedFilterId) setFilter([selectedFilterId]) // applying only this one selection as filter
    return () => {
      // cleanup
      setFilter([])
    }
  }, [selectedFilterId])

  const platformList = usePlatformList(
    allPlatform.list,
    sortOrder.platforms,
    selectedFilterIds,
    searchResult
  )

  const addFilter = id => setFilter([...selectedFilterIds, id])

  const removeFilter = id => setFilter(selectedFilterIds.filter(f => f !== id))

  const clearFilters = () => {
    setFilter([])
  }

  const inputElement = useRef(null)

  const submitSearch = async e => {
    setLoading(true)
    e.preventDefault()
    let searchstring = inputElement.current.value

    const result = await api.fetchSearchResult("platform", searchstring)

    setSearchResult(result.flat())
    setLoading(false)
  }

  const resetSearch = () => {
    setSearchResult([...allPlatform.list.map(x => x.id)])
  }

  const { getFilterLabelById, getFilterOptionsById } = selector({
    platform: allPlatform,
    instrument: allInstrument,
  })

  return (
    <ExploreLayout
      filteredCount={{
        campaigns: allCampaign.totalCount,
        platforms: platformList.filtered.length,
        instruments: allInstrument.totalCount,
      }}
    >
      <ExploreTools
        ref={inputElement}
        submitSearch={submitSearch}
        resetSearch={resetSearch}
        selectedFilterIds={selectedFilterIds}
        addFilter={addFilter}
        getFilterOptionsById={getFilterOptionsById}
        removeFilter={removeFilter}
        category={"platforms"}
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
          sortOrder={sortOrder["platforms"]}
          setSortOrder={setSortOrder}
          category={"platforms"}
        />
        <PlatformNav
          items={Object.keys(platformList.grouped).map(group => ({
            id: group,
            label: `${group} (${platformList.grouped[group].length})`,
          }))}
        />
      </div>

      <ExploreSection isLoading={isLoading}>
        {Object.entries(platformList.grouped).map(
          ([platformType, platforms]) => (
            <React.Fragment key={platformType}>
              <div
                css={`
                  grid-column: 1 / -1;
                  display: flex;
                  justify-content: space-between;
                  align-items: baseline;
                `}
              >
                <h3
                  id={platformType}
                  css={`
                    grid-column: 1/-1;
                  `}
                >
                  {platformType} <small>({platforms.length})</small>
                </h3>
                <a
                  href="#top"
                  css={`
                    grid-column: -2;
                    align-self: center;
                  `}
                  data-cy={`top-inpage-link`}
                >
                  to top <ArrowIcon direction="up" />
                </a>
              </div>

              {platforms.map(platform => {
                return (
                  <PlatformCard
                    shortname={platform.shortname}
                    key={platform.id}
                  />
                )
              })}
            </React.Fragment>
          )
        )}
      </ExploreSection>
    </ExploreLayout>
  )
}

export const query = graphql`
  query {
    allCampaign {
      totalCount
    }
    allPlatform {
      totalCount
      list: nodes {
        ...platformFields
      }
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allInstrument {
      totalCount
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
  }

  fragment platformFields on platform {
    shortname: short_name # required for sort
    id
    collectionPeriodIds: collection_periods # required for sort
    campaigns {
      id # required for sort
    }
    instruments {
      id # required for filter
    }
    searchCategory: search_category
    platformType: platform_type {
      id
      shortname: short_name # required for grouping
      longname: long_name
    }
  }
`

const platformShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  collectionPeriodIds: PropTypes.arrayOf(PropTypes.string),
  campaigns: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  instruments: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  searchCategory: PropTypes.string,
  platformType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    shortname: PropTypes.string,
    longname: PropTypes.string,
  }),
})

ExplorePlatforms.propTypes = {
  data: PropTypes.shape({
    allCampaign: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
    allPlatform: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(platformShape).isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }),
    allInstrument: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedFilterId: PropTypes.string,
    }),
  }),
}
