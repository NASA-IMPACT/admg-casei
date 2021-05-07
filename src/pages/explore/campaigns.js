import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { format } from "date-fns"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure"

import api from "../../utils/api"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { selector } from "../../utils/filter-utils"
import useCampaignList from "../../utils/use-campaign-list"

import ExploreLayout from "../../components/explore/explore-layout"
import ExploreTools from "../../components/explore/explore-tools"
import ExploreMap from "../../components/explore/explore-map"
import FilterChips from "../../components/filter/filter-chips"
import Chip from "../../components/chip"
import SortMenu from "../../components/explore/sort-menu"
import ExploreSection from "../../components/explore/explore-section"
import CampaignCard from "../../components/cards/campaign-card"

export default function ExploreCampaigns({ data, location }) {
  const {
    allCampaign,
    allPlatform,
    allSeason,
    allFocusArea,
    allGeophysicalConcept,
    allGeographicalRegion,
    allInstrument,
  } = data
  const { selectedFilterId } = location.state || {}

  const [isLoading, setLoading] = useState(false)

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
  const [isDisplayingMap, toggleMap] = useState(true)

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

    const result = await api.fetchSearchResult("campaign", searchstring)

    setSearchResult(result.flat())
    setLoading(false)
  }

  const resetSearch = () => {
    setSearchResult([...allCampaign.list.map(x => x.id)])
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
    <ExploreLayout
      filteredCount={{
        campaigns: campaignList.filtered.length,
        platforms: allPlatform.totalCount,
        instruments: allInstrument.totalCount,
      }}
    >
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
        category={"campaigns"}
        toggleMap={toggleMap}
        isDisplayingMap={isDisplayingMap}
      />
      {isDisplayingMap && (
        <ExploreMap
          allData={campaignList.all.map(c => ({
            id: c.id,
            bounds: c.bounds,
            shortname: c.shortname,
          }))}
          filteredData={campaignList.filtered.map(c => ({
            id: c.id,
            bounds: c.bounds,
            shortname: c.shortname,
          }))}
          setGeoFilter={setGeoFilter}
          aoi={aoi}
          setAoi={setAoi}
        />
      )}

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
          sortOrder={sortOrder["campaigns"]}
          setSortOrder={setSortOrder}
          category={"campaigns"}
        />
      </div>

      <ExploreSection isLoading={isLoading}>
        {campaignList.filtered.slice(0, 20).map(campaign => {
          return (
            <CampaignCard shortname={campaign.shortname} key={campaign.id} />
          )
        })}
      </ExploreSection>

      <Disclosure>
        <DisclosureButton
          css={`
            background-color: transparent;
            color: ${colors[NEGATIVE].text};
            border: 1px solid ${colors[NEGATIVE].text};
            margin: 3rem;
            padding: 1rem 5rem;
            text-transform: uppercase;
          `}
        >
          Show all
        </DisclosureButton>

        <DisclosurePanel>
          <ExploreSection isLoading={isLoading}>
            {campaignList.filtered.slice(20).map(campaign => {
              return (
                <CampaignCard
                  shortname={campaign.shortname}
                  key={campaign.id}
                />
              )
            })}
          </ExploreSection>
        </DisclosurePanel>
      </Disclosure>
    </ExploreLayout>
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
      options: nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
    allInstrument {
      totalCount
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

const filterOptionShape = PropTypes.shape({
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
}).isRequired

ExploreCampaigns.propTypes = {
  data: PropTypes.shape({
    allCampaign: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      list: PropTypes.arrayOf(campaignShape).isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    allPlatform: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
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
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedFilterId: PropTypes.string,
    }),
  }),
}
