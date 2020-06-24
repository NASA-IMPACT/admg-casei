import React from "react"
import renderer from "react-test-renderer"
import Chip from "../chip"

const testId = "4c5e9dc3-38ed-40cb-b6ea-cacf96057b53"
const testLabel = "Weather"

describe("Chip", () => {
  it("renders without action", () => {
    const tree = renderer
      .create(<Chip id={testId} label={testLabel} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders with action", () => {
    const tree = renderer
      .create(<Chip id={testId} label={testLabel} chipAction={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
