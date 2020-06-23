import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Spinner from "react-spinkit"

import api from "../../utils/api"
import theme from "../../utils/theme"

import Layout from "../../components/layout"
import ExploreMenu from "../../components/explore-menu"
import Searchbar from "../../components/searchbar"
import ExploreSection from "../../components/explore-section"
import CampaignCard from "../../components/campaign-card"

export const selector = filterOptions => ({
  getFilterLabelById: id => {
    for (let [key, value] of Object.entries(filterOptions)) {
      const filter = value.options.find(i => i.id === id)
      if (filter) return `${key}: ${filter.shortname}`
    }
  },
  getFilterOptionsById: id => {
    return filterOptions[id].options
  },
})

const Campaigns = ({ data, location }) => {
  const { allSeason, allFocusArea, allGeographicalRegion, allDeployment } = data
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

  /**
   * Check if the campaign has deployments in a given region.
   * @param {object} campaign - The campaign data object.
   * @param {string} filterId - The id of the item to search for, represents a region.
   * @returns {boolean} - Returns `true` if the campaign has deployments in a given region.
   */
  const campaignHasDeploymentInRegion = (campaign, filterId) => {
    const deployments = allDeployment.nodes
    const filteredDeploymentIds = deployments
      .filter(deployment => deployment.geographical_regions.includes(filterId))
      .map(d => d.id)
    return campaign.deploymentIds.some(deploymentId =>
      filteredDeploymentIds.includes(deploymentId)
    )
  }

  const list = data[sortOrder].list
    .filter(campaign =>
      selectedFilterIds.length === 0
        ? true
        : selectedFilterIds.every(
            filterId =>
              campaign.seasonIds.includes(filterId) ||
              campaign.focusIds.includes(filterId) ||
              campaignHasDeploymentInRegion(campaign, filterId)
          )
    )
    .filter(campaign =>
      searchResult ? searchResult.includes(campaign.shortname) : true
    )

  const { getFilterLabelById, getFilterOptionsById } = selector({
    focus: allFocusArea,
    season: allSeason,
    region: allGeographicalRegion,
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
          category="campaigns"
          selectedFilterIds={selectedFilterIds}
          removeFilter={removeFilter}
          filteredCount={list.length}
          totalCount={data.all.totalCount}
        >
          {list.map(campaign => {
            const startdate = new Date(campaign.startdate)
            const enddate = new Date(campaign.enddate)
            return (
              <Link to={`/campaign/${campaign.id}`} key={campaign.shortname}>
                <CampaignCard
                  ongoing={campaign.ongoing}
                  shortname={campaign.shortname}
                  longname={campaign.longname}
                  daterange={`${startdate.getFullYear()}—${enddate.getFullYear()}`}
                  region={campaign.region}
                  countCollectionPeriods={campaign.countCollectionPeriods}
                  countDataProducts={campaign.countDataProducts}
                />
              </Link>
            )
          })}
        </ExploreSection>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    all: allCampaign(sort: { order: ASC, fields: short_name }) {
      totalCount
    }
    asc: allCampaign(sort: { order: ASC, fields: short_name }) {
      list: nodes {
        ...campaignFields
      }
    }
    desc: allCampaign(sort: { order: DESC, fields: short_name }) {
      list: nodes {
        ...campaignFields
      }
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
    allGeographicalRegion {
      options: nodes {
        id
        shortname: short_name
      }
    }
    allDeployment {
      nodes {
        geographical_regions
        id
      }
    }
  }

  fragment campaignFields on campaign {
    ongoing
    shortname: short_name
    longname: long_name
    id
    seasonIds: seasons
    focusIds: focus_areas
    startdate: start_date
    enddate: end_date
    region: region_description
    deploymentIds: deployments
    countCollectionPeriods: number_collection_periods
    countDataProducts: number_data_products
  }
`

const campaignShape = PropTypes.shape({
  ongoing: PropTypes.bool,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  id: PropTypes.string.isRequired,
  seasonIds: PropTypes.arrayOf(PropTypes.string),
  focusIds: PropTypes.arrayOf(PropTypes.string),
  startdate: PropTypes.string.isRequired,
  enddate: PropTypes.string,
  region: PropTypes.string.isRequired,
  deploymentIds: PropTypes.arrayOf(PropTypes.string),
  countCollectionPeriods: PropTypes.number,
  countDataProducts: PropTypes.number,
})

Campaigns.propTypes = {
  data: PropTypes.shape({
    all: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }),
    asc: PropTypes.shape({
      list: PropTypes.arrayOf(campaignShape).isRequired,
    }),
    desc: PropTypes.shape({
      list: PropTypes.arrayOf(campaignShape).isRequired,
    }),
    allFocusArea: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    allSeason: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    allGeographicalRegion: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
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
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedFilterId: PropTypes.string,
    }),
  }),
}

export default Campaigns
