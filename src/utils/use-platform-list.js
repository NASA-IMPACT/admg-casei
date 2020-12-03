import { useState, useEffect } from "react"

import { sortFunctions, platformFilter } from "../utils/filter-utils"

export default function usePlatformList(
  queryResult,
  sortOrder,
  selectedFilterIds,
  searchResult
) {
  const [platformList, setPlatformList] = useState({
    all: queryResult,
    filtered: queryResult,
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
  }, [searchResult])

  return platformList
}
