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
    const deployments = doi.campaigns.reduce((acc, campaign) => {
      return acc.concat(campaign.deployments)
    }, [])
    return {
      enddate: enddate,
      startdate: startdate,
      deployments: deployments,
      campaignBounds: doi.campaigns[0].campaignBounds,
      ...doi,
    }
  })
}
