import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Spinner from "react-spinkit"

import api from "../../utils/api"
import theme from "../../utils/theme"

import Layout, { PageBody } from "../../components/layout"
import SEO from "../../components/seo"
import ExploreMenu from "../../components/explore/explore-menu"
import ExploreTools from "../../components/explore/explore-tools"
import ExploreSection from "../../components/explore/explore-section"
import PlatformCard from "../../components/cards/platform-card"

import { selector } from "../../utils/filter-utils"

const Platforms = ({ data, location }) => {
  const { allInstrument } = data

  const { selectedFilterId } = location.state || {}

  const [isLoading, setLoading] = useState(false)
  const [sortOrder, toggleSortOrder] = useState("asc")
  const [selectedFilterIds, setFilter] = useState([])
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    if (selectedFilterId) setFilter([selectedFilterId]) // applying only this one selection as filter
    return () => {
      // cleanup
    }
  }, [selectedFilterId])

  const addFilter = id => setFilter([...selectedFilterIds, id])
  const removeFilter = id => setFilter(selectedFilterIds.filter(f => f !== id))

  const inputElement = useRef(null)

  const submitSearch = async e => {
    setLoading(true)
    e.preventDefault()
    let searchstring = inputElement.current.value
    const result = await api.fetchSearchResult("platform", searchstring)
    setSearchResult(result)
    setLoading(false)
  }

  const list = data[sortOrder].list
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
          getFilterLabelById={getFilterLabelById}
          getFilterOptionsById={getFilterOptionsById}
          removeFilter={removeFilter}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
          ref={inputElement}
          category="platforms"
        />

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
            totalCount={data.all.totalCount}
          >
            {list.map(platform => {
              return (
                <Link to={`/platform/${platform.id}`} key={platform.id}>
                  <PlatformCard
                    shortname={platform.shortname}
                    longname={platform.longname}
                    key={platform.id}
                    description={platform.description}
                    collectionPeriodIds={platform.collectionPeriodIds}
                    instruments={platform.instruments}
                    stationary={platform.stationary}
                  />
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
    all: allPlatform(sort: { order: ASC, fields: short_name }) {
      totalCount
    }
    asc: allPlatform(sort: { order: ASC, fields: short_name }) {
      list: nodes {
        ...platform
      }
    }
    desc: allPlatform(sort: { order: DESC, fields: short_name }) {
      list: nodes {
        ...platform
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

  fragment platform on platform {
    shortname: short_name
    longname: long_name
    id
    description
    collectionPeriodIds: collection_periods
    campaigns {
      id
    }
    instruments {
      id
    }
    stationary
  }
`

const platformShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  collectionPeriodIds: PropTypes.arrayOf(PropTypes.string),
  campaigns: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  instruments: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  stationary: PropTypes.bool.isRequired,
})

Platforms.propTypes = {
  data: PropTypes.shape({
    all: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
    asc: PropTypes.shape({
      list: PropTypes.arrayOf(platformShape).isRequired,
    }),
    desc: PropTypes.shape({
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
