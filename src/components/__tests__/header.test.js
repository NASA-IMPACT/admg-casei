/**
 * @jest-environment jsdom
 */
import React from "react"
import renderer from "react-test-renderer"
import Header from "../header"
import { POSITIVE } from "../../utils/constants"

describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Header
          siteTitle="Site title from props"
          shortname="Shortname from props"
          mode={POSITIVE}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
