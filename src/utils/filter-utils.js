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

export const sortFunctions = {
  campaigns: {
    asc: (a, b) => a.shortname.localeCompare(b.shortname),
    desc: (a, b) => b.shortname.localeCompare(a.shortname),
    oldest: (a, b) => new Date(a.enddate) - new Date(b.enddate),
    latest: (a, b) => new Date(b.enddate) - new Date(a.enddate),
  },
  platforms: {
    asc: (a, b) => a.shortname.localeCompare(b.shortname),
    desc: (a, b) => b.shortname.localeCompare(a.shortname),
    popular: (a, b) =>
      b.campaigns.length - a.campaigns.length ||
      b.collectionPeriodIds.length - a.collectionPeriodIds.length,
  },
  instruments: {
    asc: (a, b) => a.shortname.localeCompare(b.shortname),
    desc: (a, b) => b.shortname.localeCompare(a.shortname),
    popular: (a, b) => b.campaigns.length - a.campaigns.length,
  },
}
