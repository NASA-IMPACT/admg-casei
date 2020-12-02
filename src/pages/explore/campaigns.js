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
import FilterChips from "../../components/filter/filter-chips"
import ExploreSection from "../../components/explore/explore-section"
import CampaignCard from "../../components/cards/campaign-card"
import ExploreMap from "../../components/explore/explore-map"
import Chip from "../../components/chip"

export default function Campaigns({ data, location }) {
  const {
    allCampaign,
    allSeason,
    allFocusArea,
    allGeophysicalConcept,
    allGeographicalRegion,
    allPlatform,
  } = data
  const { selectedFilterId } = location.state || {}

  const [isLoading, setLoading] = useState(false)
  const [campaignList, setCampaignList] = useState({
    all: allCampaign.list,
    filtered: allCampaign.list,
    filteredByMenu: allCampaign.list,
    filteredByGeo: allCampaign.list,
    filteredBySearch: allCampaign.list,
  })
  const [sortOrder, setSortOrder] = useState("most recent")
  const [selectedFilterIds, setFilter] = useState([])
  const [aoi, setAoi] = useState(null)
  const [geoFilterResult, setGeoFilter] = useState(null)
  const [searchResult, setSearchResult] = useState()

  useEffect(() => {
    if (selectedFilterId) setFilter([selectedFilterId]) // applying only this one selection as filter
    return () => {
      // cleanup
      setFilter([])
    }
  }, [selectedFilterId])

  useEffect(() => {
    const sortedList = campaignList.filtered.sort(
      sortFunctions.campaigns[sortOrder]
    )
    setCampaignList(prev => ({ ...prev, filtered: sortedList }))
  }, [sortOrder])

  useEffect(() => {
    const filteredByMenu = allCampaign.list.filter(campaign =>
      selectedFilterIds.length === 0
        ? true
        : selectedFilterIds.every(
            filterId =>
              campaign.seasons.map(x => x.id).includes(filterId) ||
              campaign.focus.map(x => x.id).includes(filterId) ||
              campaign.geophysical.map(x => x.id).includes(filterId) ||
              campaign.deployments
                .map(x => x.regions.map(y => y.id))
                .flat()
                .includes(filterId) ||
              campaign.platforms.map(x => x.id).includes(filterId) ||
              campaign.fundingAgency.includes(filterId)
          )
    )

    setCampaignList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        campaign =>
          filteredByMenu.map(c => c.id).includes(campaign.id) &&
          prev.filteredByGeo.map(c => c.id).includes(campaign.id) &&
          prev.filteredBySearch.map(c => c.id).includes(campaign.id)
      ),
      filteredByMenu,
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
    const filteredBySearch = allCampaign.list.filter(campaign =>
      searchResult ? searchResult.includes(campaign.shortname) : true
    )
    setCampaignList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        campaign =>
          prev.filteredByMenu.map(c => c.id).includes(campaign.id) &&
          prev.filteredByGeo.map(c => c.id).includes(campaign.id) &&
          filteredBySearch.map(c => c.id).includes(campaign.id)
      ),
      filteredBySearch,
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
    const result = await api.fetchSearchResult("campaign", searchstring)
    setSearchResult(result)
    setLoading(false)
  }

  const resestSearch = e => {
    e.preventDefault()
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
  })

  return (
    <Layout>
      <SEO title="Campaigns" />
      <PageBody id="campaigns">
        <ExploreMenu />

        <ExploreTools
          ref={inputElement}
          submitSearch={submitSearch}
          resestSearch={resestSearch}
          selectedFilterIds={selectedFilterIds}
          addFilter={addFilter}
          getFilterOptionsById={getFilterOptionsById}
          removeFilter={removeFilter}
          category="campaigns"
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
                label={"Drawn Area"}
                actionId={"aoi"}
                removeAction={removeAoi}
              />
            )}
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
            category="campaigns"
            selectedFilterIds={selectedFilterIds}
            removeFilter={removeFilter}
            clearFilters={clearFilters}
            filteredCount={campaignList.filtered.length}
            totalCount={allCampaign.totalCount}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          >
            {campaignList.filtered.map(campaign => {
              return (
                <Link to={`/campaign/${campaign.id}`} key={campaign.id}>
                  <CampaignCard id={campaign.id} />
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

const filterOptionShape = PropTypes.shape({
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
}).isRequired

Campaigns.propTypes = {
  data: PropTypes.shape({
    allCampaign: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(campaignShape).isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    allFocusArea: filterOptionShape,
    allSeason: filterOptionShape,
    allGeophysicalConcept: filterOptionShape,
    allGeographicalRegion: filterOptionShape,
    allPlatform: filterOptionShape,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedFilterId: PropTypes.string,
    }),
  }),
}
