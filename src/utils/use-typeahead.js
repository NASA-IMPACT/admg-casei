import { useState, useEffect } from "react"
import { sortFunctions } from "../utils/filter-utils"


export default function useTypeAhead(
    queryResult,
    sortOrder,
    selectedFilterIds,
    geoFilterResult,
    dateRange,
    searchResult
) {
    const [typeAhead, setTypeAhead] = useState({
        all: queryResult,
        filtered: queryResult,
        filteredByMenu: queryResult,
        filteredByGeo: queryResult,
        filteredByDateRange: queryResult,
        filteredBySearch: queryResult,
    })

    useEffect(() => {
        // update typeAhead 
        setTypeAhead(prev => ({
            ...prev,
            filtered: typeAhead.filtered.sort(sortFunctions.typeAhead['searchCampaigns']),
        }))
    }, [
        sortOrder,
        selectedFilterIds,
        geoFilterResult,
        dateRange,
        searchResult,
    ])
}