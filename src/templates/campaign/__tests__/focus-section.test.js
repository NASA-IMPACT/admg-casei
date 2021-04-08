import React from "react"
import { create } from "react-test-renderer"

import FocusSection from "../focus-section"

const testString = "test string"
const testArray = [
  {
    id: "f1bd646f-876f-4e9f-896e-f7d4571ecc00",
    shortname: "Carbon Cycle & Ecosystems",
    longname: "Carbon Cycle & Ecosystems",
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
