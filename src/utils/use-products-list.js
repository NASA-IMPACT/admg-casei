import { useState, useEffect } from "react"
import { isAfter, isBefore, isWithinInterval } from "date-fns"

import { sortFunctions, productsFilter } from "../utils/filter-utils"

export default function useProductsList(
  queryResult,
  sortOrder,
  selectedFilterIds,
  geoFilterResult,
  dateRange,
  searchResult,
  category
) {
  const [productList, setProductList] = useState({
    all: queryResult,
    filtered: queryResult,
    filteredByMenu: queryResult,
    filteredByGeo: queryResult,
    filteredByDateRange: queryResult,
    filteredBySearch: queryResult,
  })

  useEffect(() => {
    // update sort order
    setProductList(prev => ({
      ...prev,
      filtered: productList.filtered.sort(sortFunctions[category][sortOrder]),
    }))
  }, [sortOrder])

  useEffect(() => {
    // update after filter selection
    const filteredCampaignByMenu = queryResult.filter(
      productsFilter(selectedFilterIds)
    )

    setProductList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        product =>
          filteredCampaignByMenu.map(c => c.id).includes(product.id) &&
          prev.filteredByGeo.map(c => c.id).includes(product.id) &&
          prev.filteredByDateRange.map(c => c.id).includes(product.id) &&
          prev.filteredBySearch.map(c => c.id).includes(product.id)
      ),
      filteredByMenu: filteredCampaignByMenu,
    }))
  }, [selectedFilterIds])

  useEffect(() => {
    // update after drawing an area

    // TODO check that this is not a many to many relationship
    const filteredByGeo = queryResult.filter(product =>
      geoFilterResult ? geoFilterResult.includes(product.campaigns[0].id) : true
    )

    setProductList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        product =>
          prev.filteredByMenu.map(c => c.id).includes(product.id) &&
          filteredByGeo.map(c => c.id).includes(product.id) &&
          prev.filteredByDateRange.map(c => c.id).includes(product.id) &&
          prev.filteredBySearch.map(c => c.id).includes(product.id)
      ),
      filteredByGeo,
    }))
  }, [geoFilterResult])

  useEffect(() => {
    // update after changing the date range
    const filteredCampaignByDateRange = queryResult.filter(product => {
      if (!(dateRange.start && dateRange.end)) return true

      const isStartWithinRange = isWithinInterval(
        new Date(product.startdate),
        dateRange
      )

      const isEndWithinRange = product.enddate
        ? isWithinInterval(new Date(product.enddate), dateRange)
        : // ongoing campaigns have enddate: null, use now in that case
          isWithinInterval(new Date(), dateRange)

      const isStartBeforeAndEndAfterRange =
        isBefore(new Date(product.startdate), dateRange.start) &&
        isAfter(new Date(product.enddate), dateRange.end)

      // eslint-disable-next-line no-unused-vars
      const isWithinRange = isStartWithinRange && isEndWithinRange
      const isIntersectingRange =
        isStartWithinRange || isEndWithinRange || isStartBeforeAndEndAfterRange

      return isIntersectingRange
    })

    setProductList(prev => ({
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

    setProductList(prev => ({
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

  return productList
}
