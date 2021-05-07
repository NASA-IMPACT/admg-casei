import { useState, useEffect } from "react"

import { sortFunctions, instrumentFilter } from "../utils/filter-utils"

export default function useInstrumentList(
  queryResult,
  sortOrder,
  selectedFilterIds,
  searchResult
) {
  const [instrumentList, setInstrumentList] = useState({
    all: queryResult,
    filtered: queryResult,
    filteredByMenu: queryResult,
    filteredBySearch: queryResult,
  })

  useEffect(() => {
    // update sort order
    setInstrumentList(prev => ({
      ...prev,
      filtered: instrumentList.filtered.sort(
        sortFunctions.instruments[sortOrder]
      ),
    }))
  }, [sortOrder])

  useEffect(() => {
    // update after filter selection
    const filteredInstrumentByMenu = queryResult.filter(
      instrumentFilter(selectedFilterIds)
    )

    setInstrumentList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        instrument =>
          filteredInstrumentByMenu.map(c => c.id).includes(instrument.id) &&
          prev.filteredBySearch.map(c => c.id).includes(instrument.id)
      ),
      filteredByMenu: filteredInstrumentByMenu,
    }))
  }, [selectedFilterIds])

  useEffect(() => {
    // update after entering text in the search bar
    const filteredInstrumentBySearch = queryResult.filter(instrument =>
      searchResult
        ? instrument.shortname
            .toLowerCase()
            .includes(searchResult.toLowerCase())
        : true
    )
    setInstrumentList(prev => ({
      ...prev,
      filtered: prev.all.filter(
        instrument =>
          prev.filteredByMenu.map(c => c.id).includes(instrument.id) &&
          filteredInstrumentBySearch.map(c => c.id).includes(instrument.id)
      ),
      filteredBySearch: filteredInstrumentBySearch,
    }))
  }, [searchResult])

  return instrumentList
}
