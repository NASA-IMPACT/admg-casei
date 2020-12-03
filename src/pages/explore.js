import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import api from "../utils/api"
import {
  selector,
  sortFunctions,
  campaignFilter,
  platformFilter,
  instrumentFilter,
} from "../utils/filter-utils"

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
  const { selectedFilterId } = location.state || {}

  const [isLoading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("campaigns")
  const [campaignList, setCampaignList] = useState({
    all: allCampaign.list,
    filtered: allCampaign.list,
    filteredByMenu: allCampaign.list,
    filteredByGeo: allCampaign.list,
    filteredBySearch: allCampaign.list,
  })
  const [platformList, setPlatformList] = useState({
    all: allPlatform.list,
    filtered: allPlatform.list,
    filteredByMenu: allPlatform.list,
    filteredBySearch: allPlatform.list,
  })
  const [instrumentList, setInstrumentList] = useState({
    all: allInstrument.list,
    filtered: allInstrument.list,
    filteredByMenu: allInstrument.list,
    filteredBySearch: allInstrument.list,
  })
  const [sortOrder, setSortOrder] = useState({
    campaigns: "most recent",
    instruments: "most used",
    platforms: "most used",
  })
  const [selectedFilterIds, setFilter] = useState([])
  const [aoi, setAoi] = useState(null)
  const [geoFilterResult, setGeoFilter] = useState(null)
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    // update based on passed state
    if (selectedFilterId) setFilter([selectedFilterId]) // applying only this one selection as filter
    return () => {
      // cleanup
      setFilter([])
    }
  }, [selectedFilterId])

  useEffect(() => {
    setCampaignList(prev => ({
      ...prev,
      filtered: campaignList.filtered.sort(
        sortFunctions.campaigns[sortOrder.campaigns]
      ),
    }))

    setPlatformList(prev => ({
      ...prev,
      filtered: platformList.filtered.sort(
        sortFunctions.platforms[sortOrder.platforms]
      ),
    }))

    setInstrumentList(prev => ({
      ...prev,
      filtered: instrumentList.filtered.sort(
        sortFunctions.instruments[sortOrder.instruments]
      ),
    }))
  }, [sortOrder])

  useEffect(() => {
    const filteredCampaignByMenu = allCampaign.list.filter(
      campaignFilter(selectedFilterIds)
    )

    setCampaignList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        campaign =>
          filteredCampaignByMenu.map(c => c.id).includes(campaign.id) &&
          prev.filteredByGeo.map(c => c.id).includes(campaign.id) &&
          prev.filteredBySearch.map(c => c.id).includes(campaign.id)
      ),
      filteredByMenu: filteredCampaignByMenu,
    }))

    const filteredPlatformByMenu = allPlatform.list.filter(
      platformFilter(selectedFilterIds)
    )

    setPlatformList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        platform =>
          filteredPlatformByMenu.map(c => c.id).includes(platform.id) &&
          prev.filteredBySearch.map(c => c.id).includes(platform.id)
      ),
      filteredByMenu: filteredPlatformByMenu,
    }))

    const filteredInstrumentByMenu = allInstrument.list.filter(
      instrumentFilter(selectedFilterIds)
    )

    setInstrumentList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        instrument =>
          filteredInstrumentByMenu.map(c => c.id).includes(instrument.id) &&
          prev.filteredBySearch.map(c => c.id).includes(instrument.id)
      ),
      filteredByMenu: filteredInstrumentByMenu,
    }))
  }, [selectedFilterIds])

  useEffect(() => {
    const filteredByGeo = allCampaign.list.filter(campaign =>
      geoFilterResult ? geoFilterResult.includes(campaign.id) : true
    )

    setCampaignList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        campaign =>
          prev.filteredByMenu.map(c => c.id).includes(campaign.id) &&
          filteredByGeo.map(c => c.id).includes(campaign.id) &&
          prev.filteredBySearch.map(c => c.id).includes(campaign.id)
      ),
      filteredByGeo,
    }))
  }, [geoFilterResult])

  useEffect(() => {
    const filteredCampaignBySearch = allCampaign.list.filter(campaign =>
      searchResult ? searchResult.includes(campaign.shortname) : true
    )
    setCampaignList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        campaign =>
          prev.filteredByMenu.map(c => c.id).includes(campaign.id) &&
          prev.filteredByGeo.map(c => c.id).includes(campaign.id) &&
          filteredCampaignBySearch.map(c => c.id).includes(campaign.id)
      ),
      filteredBySearch: filteredCampaignBySearch,
    }))

    const filteredInstrumentBySearch = allInstrument.list.filter(
      () =>
        // TODO: implement free text search for instruments
        // searchResult ? searchResult.includes(instrument.shortname) : true
        true
    )
    setInstrumentList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        instrument =>
          prev.filteredByMenu.map(c => c.id).includes(instrument.id) &&
          filteredInstrumentBySearch.map(c => c.id).includes(instrument.id)
      ),
      filteredBySearch: filteredInstrumentBySearch,
    }))

    const filteredPlatformBySearch = allPlatform.list.filter(
      () =>
        // TODO: implement free text search for platforms
        // searchResult ? searchResult.includes(platform.shortname) : true
        true
    )
    setPlatformList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        platform =>
          prev.filteredByMenu.map(c => c.id).includes(platform.id) &&
          filteredPlatformBySearch.map(c => c.id).includes(platform.id)
      ),
      filteredBySearch: filteredPlatformBySearch,
    }))
  }, [searchResult])

  const addFilter = id => setFilter([...selectedFilterIds, id])
  const removeFilter = id => setFilter(selectedFilterIds.filter(f => f !== id))
  const removeAoi = () => {
    setAoi(null)
    setGeoFilter(null)
  }
  const clearFilters = () => {
    setFilter([])
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

  return (
    <Layout>
      <SEO title="Explore" />
      <PageBody id="explore">
        <h1 hidden>Explore</h1>

        <ExploreTools
          ref={inputElement}
          submitSearch={submitSearch}
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

        {(selectedFilterIds.length > 0 || aoi) && (
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
                label={"Drawn Polygon"}
                actionId={"aoi"}
                removeAction={removeAoi}
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
    enddate: end_date # required for sort
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
