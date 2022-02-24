import { renderHook } from "@testing-library/react-hooks"

import useCampaignList from "../use-campaign-list"
import { exploreCampaignsQuery } from "../../../test/__fixtures__"

describe("use campaign list", () => {
  it("the default campaign list (without filters)", () => {
    const list = exploreCampaignsQuery.data.allCampaign.list
    const sortOrder = "most recent"
    const selectedFilterIds = []
    const geoFilterResult = null
    const dateRange = {
      start: null,
      end: null,
    }
    const searchResult = null

    const { result } = renderHook(() =>
      useCampaignList(
        list,
        sortOrder,
        selectedFilterIds,
        geoFilterResult,
        dateRange,
        searchResult
      )
    )

    const campaignList = result.current

    const firstCampaign = campaignList.filtered[0]
    const lastCampaign = campaignList.filtered[campaignList.filtered.length - 1]

    expect(campaignList.filtered.length).toEqual(list.length)
    expect(new Date(firstCampaign.enddate).getTime()).toBeGreaterThan(
      new Date(lastCampaign.enddate).getTime()
    )
    expect(new Date(lastCampaign.enddate).getTime()).toBeLessThan(
      new Date(firstCampaign.enddate).getTime()
    )
  })

  it("the campaign list sorted a > z recent (without filters)", () => {
    const list = exploreCampaignsQuery.data.allCampaign.list
    const sortOrder = "a to z"
    const selectedFilterIds = []
    const geoFilterResult = null
    const dateRange = {
      start: null,
      end: null,
    }
    const searchResult = null

    const { result } = renderHook(() =>
      useCampaignList(
        list,
        sortOrder,
        selectedFilterIds,
        geoFilterResult,
        dateRange,
        searchResult
      )
    )

    const campaignList = result.current
    const firstCampaign = campaignList.filtered[0]
    const lastCampaign = campaignList.filtered[campaignList.filtered.length - 1]

    expect(campaignList.filtered.length).toEqual(list.length)
    expect(firstCampaign.shortname.charCodeAt(0)).toBeLessThan(
      lastCampaign.shortname.charCodeAt(0)
    )
    expect(lastCampaign.shortname.charCodeAt(0)).toBeGreaterThan(
      firstCampaign.shortname.charCodeAt(0)
    )
  })

  it("the campaign list sorted z > a (without filters)", () => {
    const list = exploreCampaignsQuery.data.allCampaign.list
    const sortOrder = "z to a"
    const selectedFilterIds = []
    const geoFilterResult = null
    const dateRange = {
      start: null,
      end: null,
    }
    const searchResult = null

    const { result } = renderHook(() =>
      useCampaignList(
        list,
        sortOrder,
        selectedFilterIds,
        geoFilterResult,
        dateRange,
        searchResult
      )
    )

    const campaignList = result.current
    const firstCampaign = campaignList.filtered[0]
    const lastCampaign = campaignList.filtered[campaignList.filtered.length - 1]

    expect(campaignList.filtered.length).toEqual(list.length)
    expect(firstCampaign.shortname.charCodeAt(0)).toBeGreaterThan(
      lastCampaign.shortname.charCodeAt(0)
    )
    expect(lastCampaign.shortname.charCodeAt(0)).toBeLessThan(
      firstCampaign.shortname.charCodeAt(0)
    )
  })

  it("the campaign list with a filter selected", () => {
    const seasonId =
      exploreCampaignsQuery.data.allCampaign.list[0].seasons[0].id

    const list = exploreCampaignsQuery.data.allCampaign.list
    const sortOrder = "most used"
    const selectedFilterIds = [seasonId]
    const geoFilterResult = null
    const dateRange = {
      start: null,
      end: null,
    }
    const searchResult = null

    const { result } = renderHook(() =>
      useCampaignList(
        list,
        sortOrder,
        selectedFilterIds,
        geoFilterResult,
        dateRange,
        searchResult
      )
    )

    const campaignList = result.current

    expect(campaignList.filtered.length).toBeLessThan(list.length)
    expect(campaignList.filtered.length).toBeGreaterThan(20)

    campaignList.filtered.forEach(campaign => {
      expect(campaign.seasons.map(x => x.id)).toContain(seasonId)
    })
  })

  it("the campaign list with a date range selected", () => {
    const list = exploreCampaignsQuery.data.allCampaign.list
    const sortOrder = "most used"
    const selectedFilterIds = []
    const geoFilterResult = null
    const dateRange = {
      start: new Date("03/22/2017"),
      end: new Date("04/01/2017"),
    }
    const searchResult = null

    const { result } = renderHook(() =>
      useCampaignList(
        list,
        sortOrder,
        selectedFilterIds,
        geoFilterResult,
        dateRange,
        searchResult
      )
    )

    const campaignList = result.current

    expect(campaignList.filtered.length).toBeLessThan(list.length)
    expect(campaignList.filtered.length).toBeGreaterThan(1)
  })
})
