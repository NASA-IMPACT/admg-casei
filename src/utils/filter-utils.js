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
