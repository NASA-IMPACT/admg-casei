import { minBy } from "lodash"

export function doiRelationalMapper(doiList) {
  return doiList.map(doi => {
    const startdate = minBy(
      doi.campaigns,
      campaign => campaign.start_date
    )?.start_date
    const enddate = minBy(
      doi.campaigns,
      campaign => campaign.end_date
    )?.end_date
    return { enddate: enddate, startdate: startdate, ...doi }
  })
}
