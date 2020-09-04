import React from "react"
import { create } from "react-test-renderer"

import FocusSection from "../focus-section"

const testString = "test string"
const testArray = [
  {
    id: "a",
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
