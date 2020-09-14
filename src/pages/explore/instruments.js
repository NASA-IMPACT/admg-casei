import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Spinner from "react-spinkit"

import api from "../../utils/api"
import { selector, sortFunctions } from "../../utils/filter-utils"
import theme from "../../utils/theme"

import Layout, { PageBody } from "../../components/layout"
import SEO from "../../components/seo"
import ExploreMenu from "../../components/explore/explore-menu"
import ExploreSection from "../../components/explore/explore-section"
import ExploreTools from "../../components/explore/explore-tools"
import InstrumentCard from "../../components/cards/instrument-card"

export default function Instruments({ data, location }) {
  const { allInstrument, allInstrumentType } = data

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
    const result = await api.fetchSearchResult("instrument", searchstring)
    setSearchResult(result)
    setLoading(false)
  }

  const list = allInstrument.list
    .sort(sortFunctions.instruments[sortOrder])
    .filter(instrument => {
      return selectedFilterIds.length === 0
        ? true
        : selectedFilterIds.every(filterId =>
            instrument.instrumentTypes.includes(filterId)
          )
    })
    .filter(instrument =>
      searchResult ? searchResult.includes(instrument.shortname) : true
    )

  const { getFilterLabelById, getFilterOptionsById } = selector({
    type: allInstrumentType,
  })
  return (
    <Layout>
      <SEO title="Instruments" />
      <PageBody id="instruments">
        <ExploreMenu />
        <ExploreTools
          submitSearch={submitSearch}
          selectedFilterIds={selectedFilterIds}
          clearFilters={clearFilters}
          addFilter={addFilter}
          getFilterLabelById={getFilterLabelById}
          getFilterOptionsById={getFilterOptionsById}
          removeFilter={removeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
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
            clearFilters={clearFilters}
            removeFilter={removeFilter}
            filteredCount={list.length}
            totalCount={allInstrument.totalCount}
          >
            {list.map(instrument => {
              return (
                <Link to={`/instrument/${instrument.id}`} key={instrument.id}>
                  <InstrumentCard
                    shortname={instrument.shortname}
                    longname={instrument.longname}
                    key={instrument.id}
                    description={instrument.description}
                    campaigns={instrument.campaigns}
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
    allInstrument {
      totalCount
      list: nodes {
        ...instrumentFields
      }
    }
    allInstrumentType {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
  }

  fragment instrumentFields on instrument {
    shortname: short_name
    longname: long_name
    id
    instrumentTypes: instrument_types
    description
    campaigns
  }
`

const instrumentShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  id: PropTypes.string.isRequired,
  instrumentTypes: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.string),
})

Instruments.propTypes = {
  data: PropTypes.shape({
    allInstrument: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
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
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedFilterId: PropTypes.string,
    }),
  }),
}
