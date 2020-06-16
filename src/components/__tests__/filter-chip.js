import React from "react"
import renderer from "react-test-renderer"
import FilterChip from "../filter-chip"

const testId = "4c5e9dc3-38ed-40cb-b6ea-cacf96057b53"
const testLabel = "Weather"

describe("FilterChip", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <FilterChip id={testId} label={testLabel} removeFilter={() => {}} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
