import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Spinner from "react-spinkit"

import api from "../../utils/api"
import { selector, sortFunctions } from "../../utils/filter-utils"
import theme from "../../utils/theme"

import Layout, { PageBody } from "../../components/layout"
import SEO from "../../components/seo"
import ExploreMenu from "../../components/explore/explore-menu"
import ExploreTools from "../../components/explore/explore-tools"
import ExploreSection from "../../components/explore/explore-section"
import PlatformCard from "../../components/cards/platform-card"
import FilterChips from "../../components/filter/filter-chips"
import Chip from "../../components/chip"

const Platforms = ({ data, location }) => {
  const { allPlatform, allInstrument } = data

  const { selectedFilterId } = location.state || {}

  const [isLoading, setLoading] = useState(false)
  const [sortOrder, setSortOrder] = useState("most used")
  const [selectedFilterIds, setFilter] = useState([])
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    if (selectedFilterId) setFilter([selectedFilterId]) // applying only this one selection as filter
    return () => {
      // cleanup
      setFilter([])
    }
  }, [selectedFilterId])

  const addFilter = id => setFilter([...selectedFilterIds, id])
  const removeFilter = id => setFilter(selectedFilterIds.filter(f => f !== id))
  const clearFilters = () => setFilter([])

  const inputElement = useRef(null)

  const submitSearch = async e => {
    setLoading(true)
    e.preventDefault()
    let searchstring = inputElement.current.value
    const result = await api.fetchSearchResult("platform", searchstring)
    setSearchResult(result)
    setLoading(false)
  }

  const list = allPlatform.list
    .sort(sortFunctions.platforms[sortOrder])
    .filter(platform =>
      selectedFilterIds.length === 0
        ? true
        : selectedFilterIds.every(filterId =>
            platform.instruments.map(x => x.id).includes(filterId)
          )
    )
    .filter(platform =>
      searchResult ? searchResult.includes(platform.shortname) : true
    )

  const { getFilterLabelById, getFilterOptionsById } = selector({
    instrument: allInstrument,
  })

  return (
    <Layout>
      <SEO title="Platforms" />
      <PageBody id="platforms">
        <ExploreMenu />
        <ExploreTools
          submitSearch={submitSearch}
          selectedFilterIds={selectedFilterIds}
          addFilter={addFilter}
          clearFilters={clearFilters}
          getFilterLabelById={getFilterLabelById}
          getFilterOptionsById={getFilterOptionsById}
          removeFilter={removeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          ref={inputElement}
          category="platforms"
        />

        {selectedFilterIds.length > 0 && (
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
        )}

        {isLoading ? (
          <div
            style={{ display: `flex`, justifyContent: `space-around` }}
            data-cy="loading-indicator"
          >
            <Spinner name="cube-grid" color={theme.color.base} />
          </div>
        ) : (
          <ExploreSection
            category="platforms"
            selectedFilterIds={selectedFilterIds}
            removeFilter={removeFilter}
            filteredCount={list.length}
            totalCount={allPlatform.totalCount}
          >
            {list.map(platform => {
              return (
                <Link to={`/platform/${platform.id}`} key={platform.id}>
                  <PlatformCard id={platform.id} />
                </Link>
              )
            })}
          </ExploreSection>
        )}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query {
    allPlatform {
      totalCount
      list: nodes {
        shortname: short_name # required for sort
        id
        collectionPeriodIds: collection_periods # required for sort
        campaigns {
          id # required for sort
        }
        instruments {
          id # required for filter
        }
      }
    }
    allInstrument {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
  }
`

const platformShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  collectionPeriodIds: PropTypes.arrayOf(PropTypes.string),
  campaigns: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  instruments: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
})

Platforms.propTypes = {
  data: PropTypes.shape({
    allPlatform: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(platformShape).isRequired,
    }),
    allInstrument: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedFilterId: PropTypes.string,
    }),
  }),
}

export default Platforms
