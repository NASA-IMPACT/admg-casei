import React from "react"
import { create } from "react-test-renderer"
import { useStaticQuery } from "gatsby"

import FocusSection from "../focus-section"

const testString = "test string"
const testArray = ["a", "b"]

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      allFocusArea: {
        nodes: [
          {
            id: "a",
            shortname: "area a",
            longname: "area a",
          },
        ],
      },
    }
  })
})

describe("Focus Section", () => {
  it("displays content", () => {
    const tree = create(
      <FocusSection
        focusAreaIds={testArray}
        focusPhenomena={testString}
        scienceKeywords={testString}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
