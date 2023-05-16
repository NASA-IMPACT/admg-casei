import { useState, useEffect } from "react"
import { isAfter, isBefore, isWithinInterval } from "date-fns"
import { sortFunctions, campaignFilter } from "../utils/filter-utils"

export default function useCampaignList(
  queryResult,
  sortOrder,
  selectedFilterIds,
  geoFilterResult,
  dateRange,
  searchResult
) {
  const [campaignList, setCampaignList] = useState({
    all: queryResult,
    filtered: queryResult,
    filteredByMenu: queryResult,
    filteredByGeo: queryResult,
    filteredByDateRange: queryResult,
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
          prev.filteredByDateRange.map(c => c.id).includes(campaign.id) &&
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
          prev.filteredByDateRange.map(c => c.id).includes(campaign.id) &&
          prev.filteredBySearch.map(c => c.id).includes(campaign.id)
      ),
      filteredByGeo,
    }))
  }, [geoFilterResult])

  useEffect(() => {
    // update after changing the date range
    const filteredCampaignByDateRange = queryResult.filter(campaign => {
      if (!(dateRange.start && dateRange.end)) return true

      const isStartWithinRange = isWithinInterval(
        new Date(campaign.startdate),
        dateRange
      )

      const isEndWithinRange = campaign.enddate
        ? isWithinInterval(new Date(campaign.enddate), dateRange)
        : // ongoing campaigns have enddate: null, use now in that case
          isWithinInterval(new Date(), dateRange)

      const isStartBeforeAndEndAfterRange =
        isBefore(new Date(campaign.startdate), dateRange.start) &&
        isAfter(new Date(campaign.enddate), dateRange.end)

      // eslint-disable-next-line no-unused-vars
      const isWithinRange = isStartWithinRange && isEndWithinRange
      const isIntersectingRange =
        isStartWithinRange || isEndWithinRange || isStartBeforeAndEndAfterRange

      return isIntersectingRange
    })

    setCampaignList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        campaign =>
          prev.filteredByMenu.map(c => c.id).includes(campaign.id) &&
          prev.filteredByGeo.map(c => c.id).includes(campaign.id) &&
          filteredCampaignByDateRange.map(c => c.id).includes(campaign.id) &&
          prev.filteredBySearch.map(c => c.id).includes(campaign.id)
      ),
      filteredByDateRange: filteredCampaignByDateRange,
    }))
  }, [dateRange])

  useEffect(() => {
    // update after entering text in the 'filter by name' field
    const filteredCampaignBySearch = queryResult.filter(campaign => {
      return searchResult
        ? campaign.shortname
            .toLowerCase()
            .includes(searchResult.toLowerCase()) ||
            campaign.longname
              ?.toLowerCase()
              .includes(searchResult.toLowerCase())
        : true
    })

    setCampaignList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        campaign =>
          prev.filteredByMenu.map(c => c.id).includes(campaign.id) &&
          prev.filteredByGeo.map(c => c.id).includes(campaign.id) &&
          prev.filteredByDateRange.map(c => c.id).includes(campaign.id) &&
          filteredCampaignBySearch.map(c => c.id).includes(campaign.id)
      ),
      filteredBySearch: filteredCampaignBySearch,
    }))
  }, [searchResult])

  return campaignList
}
