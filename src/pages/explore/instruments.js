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
import FilterChips from "../../components/filter/filter-chips"
import Chip from "../../components/chip"

export default function Instruments({ data, location }) {
  const { allInstrument, allMeasurementType, allMeasurementRegion } = data

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
        : selectedFilterIds.every(
            filterId =>
              (instrument.measurementType &&
                instrument.measurementType.id === filterId) ||
              instrument.measurementRegions.map(x => x.id).includes(filterId)
          )
    })
    .filter(instrument =>
      searchResult ? searchResult.includes(instrument.shortname) : true
    )

  const { getFilterLabelById, getFilterOptionsById } = selector({
    type: allMeasurementType,
    vertical: allMeasurementRegion,
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
                  <InstrumentCard id={instrument.id} />
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
        shortname: short_name # required for sort
        id
        measurementType: measurement_type {
          id # required for filter
        }
        measurementRegions: measurement_regions {
          id # required for filter
        }
        campaigns {
          id # required for sort
        }
      }
    }
    allMeasurementType {
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
  }
`

const instrumentShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  measurementType: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
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

Instruments.propTypes = {
  data: PropTypes.shape({
    allInstrument: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(instrumentShape).isRequired,
    }),
    allMeasurementType: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    allMeasurementRegion: PropTypes.shape({
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
