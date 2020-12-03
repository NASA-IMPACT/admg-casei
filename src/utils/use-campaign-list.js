import { useState, useEffect } from "react"

import { sortFunctions, campaignFilter } from "../utils/filter-utils"

export default function useCampaignList(
  queryResult,
  sortOrder,
  selectedFilterIds,
  geoFilterResult,
  searchResult
) {
  const [campaignList, setCampaignList] = useState({
    all: queryResult,
    filtered: queryResult,
    filteredByMenu: queryResult,
    filteredByGeo: queryResult,
    filteredBySearch: queryResult,
  })

  useEffect(() => {
    // update sort order
    setCampaignList(prev => ({
      ...prev,
      filtered: campaignList.filtered.sort(sortFunctions.campaigns[sortOrder]),
    }))
  }, [sortOrder])

  useEffect(() => {
    // update after filter selection
    const filteredCampaignByMenu = queryResult.filter(
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
  }, [selectedFilterIds])

  useEffect(() => {
    // update after drawing an area
    const filteredByGeo = queryResult.filter(campaign =>
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
    // update after entering text in the search bar
    const filteredCampaignBySearch = queryResult.filter(campaign =>
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
  }, [searchResult])

  return campaignList
}
