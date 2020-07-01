import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Spinner from "react-spinkit"

import api from "../../utils/api"
import theme from "../../utils/theme"

import Layout from "../../components/layout"
import ExploreMenu from "../../components/explore-menu"
import ExploreSection from "../../components/explore-section"
import Searchbar from "../../components/searchbar"
import InstrumentCard from "../../components/cards/instrument-card"

import { selector } from "../../utils/filter-utils"

export default function Instruments({ data, location }) {
  const { allInstrumentType } = data

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
    const result = await api.fetchSearchResult(searchstring)
    setSearchResult(result)
    setLoading(false)
  }

  const list = data[sortOrder].list
    .filter(platform =>
      selectedFilterIds.length === 0
        ? true
        : selectedFilterIds.every(filterId =>
            platform.instruments.includes(filterId)
          )
    )
    .filter(platform =>
      searchResult ? searchResult.includes(platform.shortname) : true
    )

  const { getFilterLabelById, getFilterOptionsById } = selector({
    instrument: allInstrumentType,
  })
  return (
    <Layout>
      <ExploreMenu />
      <Searchbar
        submitSearch={submitSearch}
        selectedFilterIds={selectedFilterIds}
        addFilter={addFilter}
        getFilterLabelById={getFilterLabelById}
        getFilterOptionsById={getFilterOptionsById}
        removeFilter={removeFilter}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        ref={inputElement}
        category="instruments"
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
          category="instruments"
          selectedFilterIds={selectedFilterIds}
          removeFilter={removeFilter}
          filteredCount={list.length}
          totalCount={data.all.totalCount}
        >
          {list.map(instrument => {
            return (
              <InstrumentCard
                shortname={instrument.shortname}
                longname={instrument.longname}
                key={instrument.id}
                description={instrument.description}
                collectionPeriodIds={instrument.collectionPeriodIds}
                instruments={instrument.instruments}
                stationary={instrument.stationary}
              />
            )
          })}
        </ExploreSection>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    all: allInstrument(sort: { order: ASC, fields: short_name }) {
      totalCount
    }
    asc: allInstrument(sort: { order: ASC, fields: short_name }) {
      list: nodes {
        ...instrumentFields
      }
    }
    desc: allInstrument(sort: { order: DESC, fields: short_name }) {
      list: nodes {
        ...instrumentFields
      }
    }
    allInstrumentType {
      options: nodes {
        id
        short_name
        long_name
      }
    }
    allDeployment {
      nodes {
        geographical_regions
        id
      }
    }
  }

  fragment instrumentFields on instrument {
    shortname: short_name
    longname: long_name
    id
    description
    collectionPeriodIds: collection_periods
    campaigns
  }
`

const instrumentShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  collectionPeriodIds: PropTypes.arrayOf(PropTypes.string),
  campaigns: PropTypes.arrayOf(PropTypes.string),
})

Instruments.propTypes = {
  data: PropTypes.shape({
    all: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
    asc: PropTypes.shape({
      list: PropTypes.arrayOf(instrumentShape).isRequired,
    }),
    desc: PropTypes.shape({
      list: PropTypes.arrayOf(instrumentShape).isRequired,
    }),
    allInstrumentType: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    allDeployment: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          geographical_regions: PropTypes.arrayOf(PropTypes.string),
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
