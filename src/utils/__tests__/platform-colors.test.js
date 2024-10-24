import {
  getLineColors,
  getLineColorAsRGB,
  getStaticIcons,
  getPlatformIcon,
  MOVING_PLATFORMS_COLORS,
  STATIC_PLATFORMS,
  isPlatformVisible,
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

describe("isPlatformVisible", () => {
  const platformProperties = {
    platform_name: "DC-8",
    deployment: "SPADE_D1_2018",
  }
  it("returns true if there is not selected platforms and deployments", () => {
    expect(
      isPlatformVisible({
        platformProperties,
        selectedPlatforms: null,
        selectedDeployment: null,
      })
    ).toBeTruthy()
  })
  it("returns true if it is one of the selected platforms", () => {
    expect(
      isPlatformVisible({
        platformProperties,
        selectedPlatforms: ["DC-8", "ER-2"],
        selectedDeployment: null,
      })
    ).toBeTruthy()
    expect(
      isPlatformVisible({
        platformProperties,
        selectedPlatforms: ["DC-8", "ER-2"],
        selectedDeployment: { longname: "SPADE_D1_2018" },
      })
    ).toBeTruthy()
    expect(
      isPlatformVisible({
        platformProperties,
        selectedPlatforms: null,
        selectedDeployment: { longname: "SPADE_D1_2018" },
      })
    ).toBeTruthy()
  })
  it("returns false if the selected platforms and deployment does not match", () => {
    expect(
      isPlatformVisible({
        platformProperties,
        selectedPlatforms: ["DC-8", "ER-2"],
        selectedDeployment: { longname: "SPADE_D2_2019" },
      })
    ).toBeFalsy()
    expect(
      isPlatformVisible({
        platformProperties,
        selectedPlatforms: null,
        selectedDeployment: { longname: "SPADE_D2_2019" },
      })
    ).toBeFalsy()
    expect(
      isPlatformVisible({
        platformProperties,
        selectedPlatforms: ["ER-2"],
        selectedDeployment: { longname: "SPADE_D1_2018" },
      })
    ).toBeFalsy()
    expect(
      isPlatformVisible({
        platformProperties,
        selectedPlatforms: ["ER-2"],
        selectedDeployment: null,
      })
    ).toBeFalsy()
  })
})
