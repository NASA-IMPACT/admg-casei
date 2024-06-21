import { getLineColors } from "../platform-colors"

describe("getLineColor", () => {
  it("returns correct match for DC-8 and ER-2", () => {
    const platforms = ["DC-8", "ER-2"]
    const result = [
      "match",
      ["get", "platform_name"],
      "DC-8",
      "#a6cee3",
      "ER-2",
      "#1f78b4",
      "#1a9b8c",
    ]
    expect(getLineColors(platforms)).toEqual(result)
  })
})
