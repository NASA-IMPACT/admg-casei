import {
  getLineColors,
  getLineColorAsRGB,
  getStaticIcons,
  getPlatformIcon,
  MOVING_PLATFORMS_COLORS,
  STATIC_PLATFORMS,
} from "../platform-colors"

describe("getLineColor", () => {
  it("returns correct mapbox gl expression to color platforms", () => {
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

describe("getStaticIcons", () => {
  it("returns correct mapbox gl expression", () => {
    const result = [
      "match",
      ["get", "platform_name"],
      STATIC_PLATFORMS[0].name,
      STATIC_PLATFORMS[0].mapIcon,
      STATIC_PLATFORMS[1].name,
      STATIC_PLATFORMS[1].mapIcon,
      STATIC_PLATFORMS[2].name,
      STATIC_PLATFORMS[2].mapIcon,
      STATIC_PLATFORMS[3].name,
      STATIC_PLATFORMS[3].mapIcon,
      STATIC_PLATFORMS[4].name,
      STATIC_PLATFORMS[4].mapIcon,
      STATIC_PLATFORMS[5].name,
      STATIC_PLATFORMS[5].mapIcon,
      STATIC_PLATFORMS[6].name,
      STATIC_PLATFORMS[6].mapIcon,
      STATIC_PLATFORMS[7].name,
      STATIC_PLATFORMS[7].mapIcon,
      "BalloonIcon",
    ]
    expect(getStaticIcons()).toEqual(result)
  })
})

describe("getLineColorAsRGB", () => {
  it("returns the color in RGB format", () => {
    const platforms = ["DC-8", "ER-2", "GH", "Learjet"]
    expect(getLineColorAsRGB(platforms.indexOf("DC-8"))).toEqual([
      178, 223, 138,
    ])
    expect(getLineColorAsRGB(platforms.indexOf("GH"))).toEqual([253, 191, 111])
  })
})

describe("getPlatformIcon", () => {
  it("returns the icon id for a platform", () => {
    expect(getPlatformIcon("Vehicle")).toEqual("VehicleIcon")
    expect(getPlatformIcon("Permanent Land Site")).toEqual(
      "PermanentLandSiteIcon"
    )
  })
})
