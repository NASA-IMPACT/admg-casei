import React, { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { ProductsTable } from "../../components/explore/products-table"
import ExploreLayout from "../../components/explore/explore-layout"
import ExploreTools from "../../components/explore/explore-tools"
import SortMenu from "../../components/explore/sort-menu"
import { colors } from "../../theme"
import { format } from "date-fns"
import Chip from "../../components/chip"
import FilterChips from "../../components/filter/filter-chips"
import { NEGATIVE } from "../../utils/constants"
import { selector } from "../../utils/filter-utils"
import useProductsList from "../../utils/use-products-list"
import { doiRelationalMapper } from "../../utils/doi_relational_mapper"

export default function ExploreProducts({ data }) {
  const { allCampaign, allPlatform, allInstrument, allDoi } = data
  const allShapedDoi = doiRelationalMapper(allDoi.nodes)
  const inputElement = useRef(null)
  const [geoFilterResult, setGeoFilter] = useState(null)
  const [searchResult, setSearchResult] = useState(null)
  const { selectedFilterId } = location.state || {}

  const [sortOrder, setSortOrder] = useState("a to z")

  const [selectedFilterIds, setFilter] = useState([])
  const [aoi, setAoi] = useState(null)
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  })

  const [isDisplayingMap, toggleMap] = useState(false)

  useEffect(() => {
    // update based on passed state
    if (selectedFilterId) setFilter([selectedFilterId]) // applying only this one selection as filter
    return () => {
      // cleanup
      setFilter([])
    }
  }, [selectedFilterId])

  const productList = useProductsList(
    allShapedDoi,
    sortOrder,
    selectedFilterIds,
    geoFilterResult,
    dateRange,
    searchResult,
    "products"
  )

  const addFilter = id => setFilter([...selectedFilterIds, id])

  const removeFilter = id => setFilter(selectedFilterIds.filter(f => f !== id))

  const removeDateRange = () =>
    setDateRange({
      start: null,
      end: null,
    })

  const removeAoi = () => {
    setAoi(null)
    setGeoFilter(null)
  }

  const clearFilters = () => {
    setFilter([])
    removeDateRange()
    setAoi(null)
    setGeoFilter(null)
  }

  const resetSearch = () => {
    setSearchResult(null)
  }

  const allMeasurementStyles = Array.from(
    allShapedDoi.reduce((acc, doi) => {
      for (const instrument of doi.instruments) {
        if (instrument.measurement_type?.short_name) {
          acc.add(instrument.measurement_type.short_name)
        }
      }
      return acc
    }, new Set())
  ).map(m => ({
    id: m,
    shortname: m,
    longname: m,
  }))

  const allMeasurementRegions = allShapedDoi.reduce(
    (acc, doi) => {
      if (doi.instruments) {
        for (const instrument of doi.instruments) {
          if (instrument.measurement_regions) {
            for (const measurement_region of instrument.measurement_regions) {
              if (
                measurement_region?.shortname &&
                !acc.set.has(measurement_region?.shortname)
              ) {
                acc.set.add(measurement_region.shortname)
                acc.vals.push(measurement_region)
              }
            }
          }
        }
      }
      return acc
    },
    { vals: [], set: new Set() }
  ).vals

  const { getFilterLabelById, getFilterOptionsById } = selector({
    // focus: allFocusArea,
    // geophysical: allGeophysicalConcept,
    measurement: { options: allMeasurementStyles },
    vertical: { options: allMeasurementRegions },
    platform: allPlatform,
    funding: {
      // This transforms the query results from the distinct `funding_agency`
      // field into the filter format { id, shortname }.
      // - split() is used to separate the fields entry (e.g. "NOAA, NASA" to "NOAA" and "NASA")
      // - flat() is used to flatten the array after splitting
      // - Set() is used to remove duplicate elements from the array
      //   (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
      options: [],

      // [
      //   ...new Set(allCampaign.options.map(x => x.split(/\s*,\s*/)).flat()),
      // ].map(x => ({ id: x, shortname: x })),
    },
  })

  return (
    <ExploreLayout
      filteredCount={{
        campaigns: allCampaign.totalCount,
        platforms: allPlatform.totalCount,
        instruments: allInstrument?.totalCount,
        products: productList?.filtered?.length,
      }}
    >
      <ExploreTools
        ref={inputElement}
        dateRange={dateRange}
        setDateRange={setDateRange}
        setSearchResult={setSearchResult}
        resetSearch={resetSearch}
        selectedFilterIds={selectedFilterIds}
        addFilter={addFilter}
        getFilterOptionsById={getFilterOptionsById}
        removeFilter={removeFilter}
        category={"products"}
        toggleMap={toggleMap}
        isDisplayingMap={isDisplayingMap}
      />

      {/* {isDisplayingMap && (
        <ExploreMap
        allData={campaignList.all.map(c => ({
          id: c.id,
          campaignBounds: c.bounds,
          deployments: c.deployments,
          shortname: c.shortname,
        }))}
        filteredData={campaignList.filtered.map(c => {
          if (c.deployments && c.deployments.length) {
            return {
              id: c.id,
              bounds: c.bounds,
              deployments: c.deployments,
              shortname: c.shortname,
            }
          }
        })}
        setGeoFilter={setGeoFilter}
        aoi={aoi}
        setAoi={setAoi}
        />
      )} */}

      {(selectedFilterIds.length > 0 ||
        aoi ||
        !!(dateRange.start && dateRange.end)) && (
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

            {aoi && (
              <Chip
                id="filter"
                label={"aoi: Spatial extend"}
                actionId={"aoi"}
                removeAction={removeAoi}
              />
            )}

            {!!(dateRange.start && dateRange.end) && (
              <Chip
                id="filter"
                label={`date:
              ${format(dateRange.start, "MM/dd/yyyy")} to 
              ${format(dateRange.end, "MM/dd/yyyy")}`}
                actionId={"dateRange"}
                removeAction={removeDateRange}
              />
            )}
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
          category={"products"}
        />
      </div>
      {productList.filtered.length ? (
        <ProductsTable dois={productList.filtered} />
      ) : (
        <label data-cy="no-doi-label">
          There are no data products linked to this campaign in CASEI - yet.
        </label>
      )}
    </ExploreLayout>
  )
}

export const query = graphql`
  query {
    allPlatform {
      totalCount
    }
    allInstrument {
      totalCount
    }
    allDoi {
      totalCount
      nodes {
        doi
        id
        cmr_entry_title
        shortname: cmr_short_name
        campaigns {
          id
          long_name
          short_name
          end_date
          start_date
        }
        platforms {
          id
          long_name
          short_name
        }
        instruments {
          id
          measurement_type {
            short_name
            id
            long_name
          }
          measurement_regions {
            shortname: short_name
            id
            longname: long_name
          }
          short_name
          long_name
        }
      }
    }
    allCampaign {
      totalCount
    }
  }
`

ExploreProducts.propTypes = {
  data: PropTypes.shape({
    allInstrument: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
    allPlatform: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
    allDoi: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          campaigns: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              long_name: PropTypes.string.isRequired,
              short_name: PropTypes.string.isRequired,
              measurement_type: PropTypes.shape({
                short_name: PropTypes.string,
              }),
            })
          ),
          instruments: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              long_name: PropTypes.string.isRequired,
              short_name: PropTypes.string.isRequired,
            })
          ),
          platforms: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              long_name: PropTypes.string.isRequired,
              short_name: PropTypes.string.isRequired,
            })
          ),
          cmrTitle: PropTypes.string,
          doi: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string,
        })
      ).isRequired,
    }),
    allCampaign: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}
