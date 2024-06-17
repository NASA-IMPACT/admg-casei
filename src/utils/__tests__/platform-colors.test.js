import { getLineColors } from "../platform-colors"

describe("getLineColor", () => {
  it("returns correct match for DC-8 and ER-2", () => {
    const platforms = ["DC-8", "ER-2"]
    const result = [
      "match",
      ["get", "platform_name"],
      "DC-8",
      "#F1EEF6",
      "ER-2",
      "#BDC9E1",
      "#1a9b8c",
    ]
    expect(getLineColors(platforms)).toEqual(result)
  })
})
