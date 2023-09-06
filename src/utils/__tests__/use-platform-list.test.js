import { renderHook } from "@testing-library/react-hooks"
import { getCategoryName } from "../rename-category-test-util"
import usePlatformList from "../use-platform-list"
import { explorePlatformsQuery } from "../../../test/__fixtures__"

it("the default platform list (without filters)", () => {
  const list = explorePlatformsQuery.data.allPlatform.list
  const sortOrder = "most used"
  const selectedFilterIds = []
  const searchResult = null
  const { result } = renderHook(() =>
    usePlatformList(list, sortOrder, selectedFilterIds, searchResult)
  )

  const platformList = result.current
  const firstPlatform = platformList.filtered[0]
  const lastPlatform = platformList.filtered[platformList.filtered.length - 1]
  const platformGroups = Object.keys(platformList.grouped)
  // console.log({ platformList })
  // console.log({ platformGroups })
  const firstGroup = platformList.grouped[platformGroups[platformGroups.length - 1]]
  console.log({ firstGroup })


  expect(platformList.filtered.length).toEqual(list.length)
  expect(platformGroups.length).toBeGreaterThanOrEqual(5)
  expect(firstPlatform.campaigns.length).toBeGreaterThan(
    lastPlatform.campaigns.length
  )
  expect(lastPlatform.campaigns.length).toBeLessThan(
    firstPlatform.campaigns.length
  )
  expect(firstGroup.length).toBeLessThan(list.length)
  expect(firstGroup[0].campaigns.length).toBeGreaterThan(
    firstGroup[firstGroup.length - 1].campaigns.length
  )
  expect(firstGroup[firstGroup.length - 1].campaigns.length).toBeLessThan(
    firstGroup[0].campaigns.length
  )
})

it("the platform list sorted a > z (without filters)", () => {
  const list = explorePlatformsQuery.data.allPlatform.list
  const sortOrder = "a to z"
  const selectedFilterIds = []
  const searchResult = null
  const { result } = renderHook(() =>
    usePlatformList(list, sortOrder, selectedFilterIds, searchResult)
  )

  const platformList = result.current
  const firstPlatform = platformList.filtered[0]
  const lastPlatform = platformList.filtered[platformList.filtered.length - 1]
  const platformGroups = Object.keys(platformList.grouped)
  const firstGroup = platformList.grouped[platformGroups[platformGroups.length - 1]]

  expect(platformList.filtered.length).toEqual(list.length)
  expect(platformGroups.length).toBeGreaterThanOrEqual(5)
  expect(firstPlatform.shortname.charCodeAt(0)).toBeLessThan(
    lastPlatform.shortname.charCodeAt(0)
  )
  expect(lastPlatform.shortname.charCodeAt(0)).toBeGreaterThan(
    firstPlatform.shortname.charCodeAt(0)
  )
  expect(firstGroup.length).toBeLessThan(list.length)
  expect(firstGroup[0].shortname.charCodeAt(0)).toBeLessThan(
    firstGroup[firstGroup.length - 1].shortname.charCodeAt(0)
  )
  expect(
    firstGroup[firstGroup.length - 1].shortname.charCodeAt(0)
  ).toBeGreaterThan(firstGroup[0].shortname.charCodeAt(0))
})

it("the platform list sorted z > a (without filters)", () => {
  const list = explorePlatformsQuery.data.allPlatform.list
  const sortOrder = "z to a"
  const selectedFilterIds = []
  const searchResult = null
  const { result } = renderHook(() =>
    usePlatformList(list, sortOrder, selectedFilterIds, searchResult)
  )

  const platformList = result.current
  const firstPlatform = platformList.filtered[0]
  const lastPlatform = platformList.filtered[platformList.filtered.length - 1]
  const platformGroups = Object.keys(platformList.grouped)
  const firstGroup = platformList.grouped[platformGroups[platformGroups.length - 1]]

  expect(platformList.filtered.length).toEqual(list.length)
  expect(platformGroups.length).toBeGreaterThanOrEqual(5)
  expect(firstPlatform.shortname.charCodeAt(0)).toBeGreaterThan(
    lastPlatform.shortname.charCodeAt(0)
  )
  expect(lastPlatform.shortname.charCodeAt(0)).toBeLessThan(
    firstPlatform.shortname.charCodeAt(0)
  )
  expect(firstGroup.length).toBeLessThan(list.length)
  expect(firstGroup[0].shortname.charCodeAt(0)).toBeGreaterThan(
    firstGroup[firstGroup.length - 1].shortname.charCodeAt(0)
  )
  expect(
    firstGroup[firstGroup.length - 1].shortname.charCodeAt(0)
  ).toBeLessThan(firstGroup[0].shortname.charCodeAt(0))
})

it("the platform list with a filter selected", () => {
  const instrumentId =
    explorePlatformsQuery.data.allPlatform.list[0].instruments[0].id

  const list = explorePlatformsQuery.data.allPlatform.list
  const sortOrder = "most used"
  const selectedFilterIds = [instrumentId]
  const searchResult = null
  const { result } = renderHook(() =>
    usePlatformList(list, sortOrder, selectedFilterIds, searchResult)
  )

  const platformList = result.current
  const firstPlatform = platformList.filtered[0]
  const lastPlatform = platformList.filtered[platformList.filtered.length - 1]
  const platformGroups = Object.keys(platformList.grouped)
  const firstGroup = platformList.grouped[platformGroups[platformGroups.length - 1]]

  expect(platformList.filtered.length).toBeLessThan(list.length)
  expect(platformGroups.length).toBeGreaterThanOrEqual(5)
  expect(firstPlatform.campaigns.length).toBeGreaterThan(
    lastPlatform.campaigns.length
  )
  expect(lastPlatform.campaigns.length).toBeLessThan(
    firstPlatform.campaigns.length
  )
  expect(firstGroup.length).toBeLessThan(list.length)
  expect(firstGroup[0].campaigns.length).toBeGreaterThan(
    firstGroup[firstGroup.length - 1].campaigns.length
  )
  expect(firstGroup[firstGroup.length - 1].campaigns.length).toBeLessThan(
    firstGroup[0].campaigns.length
  )

  platformList.filtered.forEach(platform => {
    expect(platform.instruments.map(x => x.id)).toContain(instrumentId)
  })
  platformGroups.forEach(group => {
    // Adjusting group name for the changed category name
    const adjustedGroupName = getCategoryName(group);

    platformList.grouped[adjustedGroupName].forEach(platform => {
      expect(platform.instruments.map(x => x.id)).toContain(instrumentId)
    })
  })
})
