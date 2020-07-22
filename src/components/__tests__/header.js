import React from "react"
import renderer from "react-test-renderer"
import Header from "../header"

jest.mock("../image.js", () => {
  const mockImage = () => <img />
  return mockImage
})

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Header
          siteTitle="Site title from props"
          shortname="Shortname from props"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
