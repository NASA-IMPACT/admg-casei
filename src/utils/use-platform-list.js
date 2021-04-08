import { useState, useEffect } from "react"

import { sortFunctions, platformFilter } from "../utils/filter-utils"

// Setting these default search categories will ensure their order of appearance.
const searchCategories = {
  Aircraft: [],
  "Mobile land-based platforms": [],
  "Stationary land sites": [],
  "Water-based platforms": [],
  Other: [],
}

const groupByPlatformType = (acc, item) =>
  item.searchCategory
    ? {
        ...acc,
        [item.searchCategory]: [...(acc[item.searchCategory] || []), item],
      }
    : {
        ...acc,
        ["Other"]: [...(acc["Other"] || []), item],
      }

export default function usePlatformList(
  queryResult,
  sortOrder,
  selectedFilterIds,
  searchResult
) {
  const [platformList, setPlatformList] = useState({
    all: queryResult,
    filtered: queryResult,
    grouped: queryResult.reduce(groupByPlatformType, searchCategories),
    filteredByMenu: queryResult,
    filteredBySearch: queryResult,
  })

  useEffect(() => {
    const sortedList = platformList.filtered.sort(
      sortFunctions.platforms[sortOrder]
    )
    // update sort order
    setPlatformList(prev => ({
      ...prev,
      filtered: sortedList,
      grouped: sortedList.reduce(groupByPlatformType, searchCategories),
    }))
  }, [sortOrder])

  useEffect(() => {
    // update after filter selection
    const filteredPlatformByMenu = queryResult.filter(
      platformFilter(selectedFilterIds)
    )

    setPlatformList(prev => {
      const filteredByMenuAndSearch = prev.all.filter(
        platform =>
          filteredPlatformByMenu.map(c => c.id).includes(platform.id) &&
          prev.filteredBySearch.map(c => c.id).includes(platform.id)
      )
      return {
        ...prev,
        filtered: filteredByMenuAndSearch,
        grouped: filteredByMenuAndSearch.reduce(
          groupByPlatformType,
          searchCategories
        ),
        filteredByMenu: filteredPlatformByMenu,
      }
    })
  }, [selectedFilterIds])

  useEffect(() => {
    // update after entering text in the search bar
    const filteredPlatformBySearch = queryResult.filter(platform =>
      searchResult ? searchResult.includes(platform.id) : true
    )

    setPlatformList(prev => {
      const filteredByMenuAndSearch = prev.all.filter(
        platform =>
          prev.filteredByMenu.map(c => c.id).includes(platform.id) &&
          filteredPlatformBySearch.map(c => c.id).includes(platform.id)
      )

      return {
        ...prev,
        filtered: filteredByMenuAndSearch,
        grouped: filteredByMenuAndSearch.reduce(
          groupByPlatformType,
          searchCategories
        ),
        filteredBySearch: filteredPlatformBySearch,
      }
    })
  }, [searchResult])

  return platformList
}
