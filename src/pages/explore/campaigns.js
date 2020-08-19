import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Spinner from "react-spinkit"

import api from "../../utils/api"
import { selector, sortFunctions } from "../../utils/filter-utils"
import { formatYearRange } from "../../utils/helpers"
import theme from "../../utils/theme"

import Layout, { PageBody } from "../../components/layout"
import SEO from "../../components/seo"
import ExploreMenu from "../../components/explore/explore-menu"
import ExploreTools from "../../components/explore/explore-tools"
import ExploreSection from "../../components/explore/explore-section"
import CampaignCard from "../../components/cards/campaign-card"

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
  const [sortOrder, setSortOrder] = useState("most recent")
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

  const inputElement = useRef(null)

  const submitSearch = async e => {
    setLoading(true)
    e.preventDefault()
    let searchstring = inputElement.current.value
    const result = await api.fetchSearchResult("campaign", searchstring)
    setSearchResult(result)
    setLoading(false)
  }

  const list = allCampaign.list
    .sort(sortFunctions.campaigns[sortOrder])
    .filter(campaign =>
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
              campaign.platforms.map(x => x.id).includes(filterId)
          )
    )
    .filter(campaign =>
      searchResult ? searchResult.includes(campaign.shortname) : true
    )

  const { getFilterLabelById, getFilterOptionsById } = selector({
    focus: allFocusArea,
    geophysical: allGeophysicalConcept,
    season: allSeason,
    region: allGeographicalRegion,
    platform: allPlatform,
  })

  return (
    <Layout>
      <SEO title="Campaigns" />
      <PageBody id="campaigns">
        <ExploreMenu />
        <ExploreTools
          submitSearch={submitSearch}
          selectedFilterIds={selectedFilterIds}
          addFilter={addFilter}
          getFilterLabelById={getFilterLabelById}
          getFilterOptionsById={getFilterOptionsById}
          removeFilter={removeFilter}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          ref={inputElement}
          category="campaigns"
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
            totalCount={allCampaign.totalCount}
          >
            {list.map(campaign => {
              return (
                <Link to={`/campaign/${campaign.id}`} key={campaign.shortname}>
                  <CampaignCard
                    logo={campaign.logo}
                    ongoing={campaign.ongoing}
                    shortname={campaign.shortname}
                    longname={campaign.longname}
                    daterange={formatYearRange(
                      campaign.startdate,
                      campaign.enddate
                    )}
                    region={campaign.region}
                    countCollectionPeriods={campaign.countCollectionPeriods}
                    countDataProducts={campaign.countDataProducts}
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
    allCampaign {
      totalCount
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
    logo {
      nasaImgAlt
      nasaImgUrl
      nasaImg {
        childImageSharp {
          fixed(width: 45, height: 45) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
    ongoing
    shortname: short_name
    longname: long_name
    id
    seasons {
      id
    }
    focus: focus_areas {
      id
    }
    geophysical: geophysical_concepts {
      id
    }
    startdate: start_date
    enddate: end_date
    region: region_description
    deployments {
      id
      regions: geographical_regions {
        id
        shortname: short_name
      }
    }
    countCollectionPeriods: number_collection_periods
    countDataProducts: number_data_products
    platforms {
      id
    }
  }
`

const campaignShape = PropTypes.shape({
  logo: PropTypes.shape({
    nasaImgAlt: PropTypes.string.isRequired,
    nasaImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }).isRequired,
  ongoing: PropTypes.bool,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  id: PropTypes.string.isRequired,
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
  startdate: PropTypes.string.isRequired,
  enddate: PropTypes.string,
  region: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      regions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  countCollectionPeriods: PropTypes.number,
  countDataProducts: PropTypes.number,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
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

Campaigns.propTypes = {
  data: PropTypes.shape({
    allCampaign: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(campaignShape).isRequired,
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
