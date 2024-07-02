import { getLineColors, MOVING_PLATFORMS_COLORS } from "../platform-colors"

describe("getLineColor", () => {
  it("returns correct match for DC-8 and ER-2", () => {
    const platforms = ["DC-8", "ER-2", "GH", "Learjet"]
    const result = [
      "match",
      ["get", "platform_name"],
      "DC-8",
      MOVING_PLATFORMS_COLORS[0],
      "ER-2",
      MOVING_PLATFORMS_COLORS[1],
      "GH",
      MOVING_PLATFORMS_COLORS[2],
      "Learjet",
      MOVING_PLATFORMS_COLORS[3],
      "#1a9b8c",
    ]
    expect(getLineColors(platforms)).toEqual(result)
  })
})
