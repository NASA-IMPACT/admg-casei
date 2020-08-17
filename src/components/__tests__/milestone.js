import React from "react"
import renderer from "react-test-renderer"
import Milestone from "../timeline/milestone"

jest.mock("../image.js", () => {
  const mockImage = () => <img />
  return mockImage
})

describe("MileStone", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Milestone
          key="f2c42b8a-2c06-407c-9345-aa9824ac65f5"
          type="deployment"
          daterange="10/02/2012 - 10/20/2012"
          name="Canada, Oregon Fall 2012"
          details="2 Flights"
          region="Canada"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
