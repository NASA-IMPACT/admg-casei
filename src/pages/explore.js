import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import VisuallyHidden from "@reach/visually-hidden"
import { format } from "date-fns"

import api from "../utils/api"
import { selector } from "../utils/filter-utils"
import useCampaignList from "../utils/use-campaign-list"
import usePlatformList from "../utils/use-platform-list"
import useInstrumentList from "../utils/use-instrument-list"

import Layout, { PageBody } from "../components/layout"
import SEO from "../components/seo"
import ExploreTools from "../components/explore/explore-tools"
import FilterChips from "../components/filter/filter-chips"
import ExploreSection from "../components/explore/explore-section"
import CampaignCard from "../components/cards/campaign-card"
import ExploreMap from "../components/explore/explore-map"
import Chip from "../components/chip"
import InstrumentCard from "../components/cards/instrument-card"
import PlatformCard from "../components/cards/platform-card"
import ExploreMenu from "../components/explore/explore-menu"

export default function Explore({ data, location }) {
  const {
    allCampaign,
    allPlatform,
    allInstrument,
    allSeason,
    allFocusArea,
    allGeophysicalConcept,
    allGeographicalRegion,
    allMeasurementType,
    allMeasurementRegion,
  } = data
  const { selectedFilterId, defaultExploreCategory } = location.state || {}

  const [isLoading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(
    defaultExploreCategory || "campaigns"
  )
  const [sortOrder, setSortOrder] = useState({
    campaigns: "most recent",
    instruments: "most used",
    platforms: "most used",
  })
  const [selectedFilterIds, setFilter] = useState([])
  const [aoi, setAoi] = useState(null)
  const [geoFilterResult, setGeoFilter] = useState(null)
  const [dateRange, setDateRange] = useState({
    start: null,
    end: null,
  })
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    // update based on passed state
    if (selectedFilterId) setFilter([selectedFilterId]) // applying only this one selection as filter
    return () => {
      // cleanup
      setFilter([])
    }
  }, [selectedFilterId])

  const campaignList = useCampaignList(
    allCampaign.list,
    sortOrder.campaigns,
    selectedFilterIds,
    geoFilterResult,
    dateRange,
    searchResult
  )

  const platformList = usePlatformList(
    allPlatform.list,
    sortOrder.platforms,
    selectedFilterIds,
    dateRange,
    searchResult
  )

  const instrumentList = useInstrumentList(
    allInstrument.list,
    sortOrder.instruments,
    selectedFilterIds,
    dateRange,
    searchResult
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

  const inputElement = useRef(null)

  const submitSearch = async e => {
    setLoading(true)
    e.preventDefault()
    let searchstring = inputElement.current.value
    // TODO: search for platforms and instruments as well
    const result = await api.fetchSearchResult("campaign", searchstring)
    setSearchResult(result)
    setLoading(false)
  }

  const resetSearch = () => {
    // TODO: clear search for platforms and instruments as well
    setSearchResult(allCampaign.list.map(c => c.shortname))
  }

  const { getFilterLabelById, getFilterOptionsById } = selector({
    focus: allFocusArea,
    geophysical: allGeophysicalConcept,
    season: allSeason,
    region: allGeographicalRegion,
    platform: allPlatform,
    funding: {
      // This transforms the query results from the distinct `funding_agency`
      // field into the filter format { id, shortname }.
      // - split() is used to separate the fields entry (e.g. "NOAA, NASA" to "NOAA" and "NASA")
      // - flat() is used to flatten the array after splitting
      // - Set() is used to remove duplicate elements from the array
      //   (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
      options: [
        ...new Set(allCampaign.options.map(x => x.split(/\s*,\s*/)).flat()),
      ].map(x => ({ id: x, shortname: x })),
    },
    instrument: allInstrument,
    type: allMeasurementType,
    vertical: allMeasurementRegion,
  })
  console.log(
    "allCampaign.options",
    allCampaign.options.map(x => x.split(/\s*,\s*/))
  )
  return (
    <Layout>
      <SEO title="Explore" lang="en" />
      <PageBody id="explore">
        <VisuallyHidden>
          <h1 data-cy={`h1-${selectedCategory}`}>Explore {selectedCategory}</h1>
        </VisuallyHidden>
        <ExploreTools
          ref={inputElement}
          dateRange={dateRange}
          setDateRange={setDateRange}
          submitSearch={submitSearch}
          resetSearch={resetSearch}
          selectedFilterIds={selectedFilterIds}
          addFilter={addFilter}
          getFilterOptionsById={getFilterOptionsById}
          removeFilter={removeFilter}
          category={selectedCategory}
        />

        <ExploreMap
          allData={campaignList.all.map(c => ({
            id: c.id,
            bounds: c.bounds,
          }))}
          filteredData={campaignList.filtered.map(c => ({
            id: c.id,
            bounds: c.bounds,
          }))}
          setGeoFilter={setGeoFilter}
          aoi={aoi}
          setAoi={setAoi}
        />

        {(selectedFilterIds.length > 0 ||
          aoi ||
          !!(dateRange.start && dateRange.end)) && (
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
        )}

        <ExploreMenu
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          filteredCount={{
            campaigns: campaignList.filtered.length,
            platforms: platformList.filtered.length,
            instruments: instrumentList.filtered.length,
          }}
          sortOrder={sortOrder[selectedCategory]}
          setSortOrder={setSortOrder}
        />

        <ExploreSection isLoading={isLoading}>
          {selectedCategory === "campaigns" &&
            campaignList.filtered.map(campaign => {
              return (
                <Link to={`/campaign/${campaign.id}`} key={campaign.id}>
                  <CampaignCard id={campaign.id} />
                </Link>
              )
            })}
          {selectedCategory === "platforms" &&
            platformList.filtered.map(platform => {
              return (
                <Link to={`/platform/${platform.id}`} key={platform.id}>
                  <PlatformCard id={platform.id} />
                </Link>
              )
            })}
          {selectedCategory === "instruments" &&
            instrumentList.filtered.map(instrument => {
              return (
                <Link to={`/instrument/${instrument.id}`} key={instrument.id}>
                  <InstrumentCard id={instrument.id} />
                </Link>
              )
            })}
        </ExploreSection>
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query {
    allCampaign {
      totalCount
      list: nodes {
        ...campaignFields
      }
      options: distinct(field: funding_agency)
    }
    allSeason {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allFocusArea {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allGeophysicalConcept {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allGeographicalRegion {
      options: nodes {
        id
        shortname: short_name
      }
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
      list: nodes {
        ...instrumentFields
      }
      options: nodes {
        id
        shortname: short_name
        longname: long_name
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

  fragment campaignFields on campaign {
    id
    shortname: short_name # required for sort
    seasons {
      id # required for filter
    }
    focus: focus_areas {
      id # required for filter
    }
    geophysical: geophysical_concepts {
      id # required for filter
    }
    startdate: start_date # required for temporal filter
    enddate: end_date # required for sort and temporal filter
    deployments {
      regions: geographical_regions {
        id # required for filter
        # shortname: short_name
      }
    }
    platforms {
      id # required for filter
    }
    fundingAgency: funding_agency # required for filter
    bounds: spatial_bounds # required for map
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
  }

  fragment instrumentFields on instrument {
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
`

const campaignShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  seasons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  focus: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  geophysical: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  startdate: PropTypes.string,
  enddate: PropTypes.string,
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      regions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  fundingAgency: PropTypes.string.isRequired,
})

const platformShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  collectionPeriodIds: PropTypes.arrayOf(PropTypes.string),
  campaigns: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
  instruments: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
})

const instrumentShape = PropTypes.shape({
  shortname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  measurementType: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
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

Explore.propTypes = {
  data: PropTypes.shape({
    allCampaign: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(campaignShape).isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
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
    allFocusArea: filterOptionShape,
    allSeason: filterOptionShape,
    allGeophysicalConcept: filterOptionShape,
    allGeographicalRegion: filterOptionShape,
    allInstrument: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(instrumentShape).isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }),
    allMeasurementType: filterOptionShape,
    allMeasurementRegion: filterOptionShape,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedFilterId: PropTypes.string,
    }),
  }),
}
