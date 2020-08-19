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
    "a to z": (a, b) => a.shortname.localeCompare(b.shortname),
    "z to a": (a, b) => b.shortname.localeCompare(a.shortname),
    oldest: (a, b) => new Date(a.enddate) - new Date(b.enddate),
    "most recent": (a, b) => new Date(b.enddate) - new Date(a.enddate),
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
