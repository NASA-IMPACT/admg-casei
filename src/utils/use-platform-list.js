import { useState, useEffect } from "react"

import { sortFunctions, platformFilter } from "../utils/filter-utils"

const groupByPlatformType = (acc, item) => {
  if (!acc[item.searchCategory]) {
    acc[item.searchCategory] = []
  }

  acc[item.searchCategory].push(item)
  return acc
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
    grouped: queryResult.reduce(groupByPlatformType, {}),
    filteredByMenu: queryResult,
    filteredBySearch: queryResult,
  })

  useEffect(() => {
    // update sort order
    setPlatformList(prev => ({
      ...prev,
      filtered: platformList.filtered.sort(sortFunctions.platforms[sortOrder]),
    }))
  }, [sortOrder])

  useEffect(() => {
    // update after filter selection
    const filteredPlatformByMenu = queryResult.filter(
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

    setPlatformList(prev => ({
      ...prev,
      grouped: prev.filtered.reduce(groupByPlatformType, {}),
    }))
  }, [selectedFilterIds])

  useEffect(() => {
    // update after entering text in the search bar
    const filteredPlatformBySearch = queryResult.filter(
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

    setPlatformList(prev => ({
      ...prev,
      grouped: prev.filtered.reduce(groupByPlatformType, {}),
    }))
  }, [searchResult])

  return platformList
}
