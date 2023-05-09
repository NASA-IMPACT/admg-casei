export const selector = filterOptions => ({
  getFilterLabelById: id => {
    for (let [key, value] of Object.entries(filterOptions)) {
      const filter = value.options.find(i => i.id === id)
      if (filter) return `${key}: ${filter.shortname}`
    }
  },
  getFilterOptionsById: id => {
    return filterOptions[id].options
  },
})

export const uniqueElementsById = arr =>
  arr.reduce((acc, v) => {
    if (v && !acc.some(x => x.id == v.id)) acc.push(v)
    return acc
  }, [])

export const sortFunctions = {
  campaigns: {
    "a to z": (a, b) => a.shortname.localeCompare(b.shortname),
    "z to a": (a, b) => b.shortname.localeCompare(a.shortname),
    oldest: (a, b) =>
      (a.enddate ? new Date(a.enddate) : new Date()) -
      (b.enddate ? new Date(b.enddate) : new Date()), // if there is no enddate, use today
    "most recent": (a, b) => new Date(b.enddate) - new Date(a.enddate),
  },
  products: {
    "a to z": (a, b) => a.doi.localeCompare(b.doi),
    "z to a": (a, b) => b.doi.localeCompare(a.doi),
  },
  platforms: {
    "a to z": (a, b) => a.shortname.localeCompare(b.shortname),
    "z to a": (a, b) => b.shortname.localeCompare(a.shortname),
    "most used": (a, b) =>
      b.campaigns.length - a.campaigns.length ||
      b.collectionPeriodIds.length - a.collectionPeriodIds.length,
  },
  instruments: {
    "a to z": (a, b) => a.shortname.localeCompare(b.shortname),
    "z to a": (a, b) => b.shortname.localeCompare(a.shortname),
    "most used": (a, b) => b.campaigns.length - a.campaigns.length,
  },
}

export function campaignFilter(selectedFilterIds) {
  return campaign =>
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
            campaign.platforms.map(x => x.id).includes(filterId) ||
            campaign.fundingAgency.includes(filterId)
        )
}

export function productsFilter(selectedFilterIds) {
  return product => {
    if (!product?.instruments || selectedFilterIds.length === 0) {
      return true
    }

    const measurementTypes = Array.from(
      product.instruments.reduce((acc, instrument) => {
        if (instrument.measurement_type) {
          acc.add(instrument.measurement_type?.short_name)
        }
        return acc
      }, new Set())
    )

    return selectedFilterIds.every(filterId =>
      measurementTypes.includes(filterId)
    )
  }
}

export function platformFilter(selectedFilterIds) {
  return platform =>
    selectedFilterIds.length === 0
      ? true
      : selectedFilterIds.every(filterId =>
          platform.instruments.map(x => x.id).includes(filterId)
        )
}

export function instrumentFilter(selectedFilterIds) {
  return instrument =>
    selectedFilterIds.length === 0
      ? true
      : selectedFilterIds.every(
          filterId =>
            (instrument.measurementType &&
              instrument.measurementType.id === filterId) ||
            instrument.measurementRegions.map(x => x.id).includes(filterId)
        )
}

export function doiFilter(selectedFilterIds) {
  return doi =>
    selectedFilterIds.length === 0
      ? true
      : doi.campaigns
          ?.map(x => x.id)
          .some(id => selectedFilterIds.includes(id)) ||
        doi.platforms
          ?.map(x => x.id)
          .some(id => selectedFilterIds.includes(id)) ||
        doi.instruments
          ?.map(x => x.id)
          .some(id => selectedFilterIds.includes(id))
}
