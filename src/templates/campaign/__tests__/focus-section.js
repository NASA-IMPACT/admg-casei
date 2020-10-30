import React from "react"
import { create } from "react-test-renderer"

import FocusSection from "../focus-section"

const testString = "test string"
const testArray = [
  {
    id: "347b2275-e553-42e2-bfd5-2e077dc00a95",
    shortname: "area a",
    longname: "area a",
  },
]

describe("Focus Section", () => {
  it("displays content", () => {
    const tree = create(
      <FocusSection
        id="focus"
        focus={testArray}
        geophysical={testArray}
        focusPhenomena={testString}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
