import React from "react"
import renderer from "react-test-renderer"
import Milestone from "../timeline/milestone"

describe("MileStone", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Milestone
          key="f2c42b8a-2c06-407c-9345-aa9824ac65f5"
          type="deployment"
          startDate="2012-10-02"
          endDate="2012-10-20"
          name="Canada, Oregon Fall 2012"
          details="2 Flights"
          region="Canada"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
