import { selector } from "../../utils/filter-utils"

describe("selector", () => {
  it("has two selector funtions", () => {
    const functions = selector()
    expect(Object.keys(functions)).toHaveLength(2)
  })
})
