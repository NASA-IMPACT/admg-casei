import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Spinner from "react-spinkit"

import api from "../../utils/api"

import Layout from "../../components/layout"
import ExploreMenu from "../../components/explore-menu"
import Searchbar from "../../components/searchbar"
import ExploreSection from "../../components/explore-section"
import CampaignCard from "../../components/campaign-card"

const Campaigns = ({ data }) => {
  const { focus, season } = data

  const [isLoading, setLoading] = useState(false)
  const [sortOrder, toggleSortOrder] = useState("asc")
  const [selectedFilterIds, setFilter] = useState([])
  const [searchResult, setSearchResult] = useState()

  const addFilter = id => setFilter([...selectedFilterIds, id])
  const removeFilter = id => setFilter(selectedFilterIds.filter(f => f !== id))

  const submitSearch = async e => {
    setLoading(true)
    e.preventDefault()
    let searchstring = document.querySelector("input").value
    const result = await api.fetchSearchResult(searchstring)
    setSearchResult(result)
    setLoading(false)
  }

  const list = data[sortOrder].list
    .filter(campaign =>
      selectedFilterIds.length === 0
        ? true
        : selectedFilterIds.every(
            f => campaign.season.includes(f) || campaign.focus.includes(f)
          )
    )
    .filter(campaign =>
      searchResult ? searchResult.includes(campaign.shortname) : true
    )

  return (
    <Layout>
      <ExploreMenu />
      <Searchbar
        submitSearch={submitSearch}
        filterOptions={{ focus, season }}
        selectedFilterIds={selectedFilterIds}
        addFilter={addFilter}
        removeFilter={removeFilter}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
      />
      {isLoading ? (
        <div
          style={{ display: `flex`, justifyContent: `space-around` }}
          data-cy="loading-indicator"
        >
          <Spinner name="cube-grid" />
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
    season: allSeason {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    focus: allFocusArea {
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
  }

  fragment campaignFields on campaign {
    ongoing
    shortname: short_name
    longname: long_name
    id
    season: seasons
    focus: focus_areas
    startdate: start_date
    enddate: end_date
    region: region_description
    countCollectionPeriods: number_collection_periods
    countDataproducts: number_data_products
  }
`

const campaignShape = PropTypes.shape({
  ongoing: PropTypes.bool,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  id: PropTypes.string.isRequired,
  season: PropTypes.arrayOf(PropTypes.string),
  focus: PropTypes.arrayOf(PropTypes.string),
  startdate: PropTypes.string.isRequired,
  enddate: PropTypes.string,
  region: PropTypes.string.isRequired,
  countCollectionPeriods: PropTypes.number,
  countDataproducts: PropTypes.number,
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
    focus: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
    season: PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default Campaigns
