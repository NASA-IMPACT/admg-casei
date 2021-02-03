import React from "react"
import { create } from "react-test-renderer"

import FocusSection from "../focus-section"

const testString = "test string"
const testArray = [
  {
    id: "2231a3f1-3430-4f89-86a2-94938aa000a5",
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
