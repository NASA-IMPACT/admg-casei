export const getUniquePlatforms = collectionPeriods => {
  // We want to display one carousel item per combination of Platform and
  // Instrument. For example, if the GH Platform has 5 Deployments for this
  // Campaign, but only 2 unique sets of Instruments across those Deployments,
  // GH should appear in the carousel twice, with each carousel item displaying
  // one of those unique sets of Instruments.
  let uniqueSets = []
  let platforms = []

  // collect all the data
  for (const cdpi of collectionPeriods) {
    const platformId = cdpi.platform.id
    const instrumentIds = cdpi.instruments.map(instrument => instrument.id)
    const combinedId = `${platformId}${instrumentIds.sort().join()}`
    if (!uniqueSets.includes(combinedId)) {
      uniqueSets.push(combinedId)
      platforms.push({
        item: cdpi.platform,
        folds: cdpi.instruments,
      })
    }
  }
  return platforms
}
