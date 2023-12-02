import { getUniquePlatforms } from "../get-unique-platforms"
import collectionPeriods from "./collectionPeriods.json"

describe("getUniquePlatforms", () => {
  it("return correct names", () => {
    const platforms = getUniquePlatforms(collectionPeriods)
    expect(platforms.map(i => i.item.shortname)).toEqual([
      "DC-8",
      "ER-2",
      "Citation",
      "Campaign V",
      "Campaign PL",
      "Twin Otter",
      "Campaign B",
      "Campaign FS",
    ])
  })
})
