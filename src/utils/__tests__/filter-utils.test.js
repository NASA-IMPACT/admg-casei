import { mapLayerFilter } from "../filter-utils"

describe("mapLayerFilter", () => {
  it("returns updated deployment filter", () => {
    expect(mapLayerFilter(null, "deployment", "D1")).toEqual([
      "all",
      ["==", "deployment", "D1"],
    ])
  })
  it("returns null if current filter is null and new value is empty", () => {
    expect(mapLayerFilter(null, "deployment", "")).toBeNull()
  })
  it("returns null if the new value is empty", () => {
    expect(
      mapLayerFilter(["all", ["==", "deployment", "D1"]], "deployment", "")
    ).toBeNull()
  })
  it("returns new value with no deployment filter", () => {
    expect(
      mapLayerFilter(
        ["all", ["==", "platform_name", "B-200"], ["==", "deployment", "D1"]],
        "deployment",
        ""
      )
    ).toEqual(["all", ["==", "platform_name", "B-200"]])
  })
  it("returns new value with no platform_name filter", () => {
    expect(
      mapLayerFilter(
        ["all", ["==", "platform_name", "B-200"], ["==", "deployment", "D1"]],
        "platform_name",
        ""
      )
    ).toEqual(["all", ["==", "deployment", "D1"]])
  })
  it("returns new value to the platform_name filter", () => {
    expect(
      mapLayerFilter(
        ["all", ["==", "platform_name", "B-200"], ["==", "deployment", "D1"]],
        "platform_name",
        "Falcon"
      )
    ).toEqual([
      "all",
      ["==", "deployment", "D1"],
      ["==", "platform_name", "Falcon"],
    ])
  })
})
