import React from "react"
import renderer from "react-test-renderer"
import Chip from "../chip"

const testActionId = "4c5e9dc3-38ed-40cb-b6ea-cacf96057b53"
const testId = "filter"
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
      .create(
        <Chip
          id={testId}
          label={testLabel}
          actionId={testActionId}
          removeAction={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
