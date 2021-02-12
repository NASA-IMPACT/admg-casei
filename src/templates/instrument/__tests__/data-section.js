import React from "react"
import { create } from "react-test-renderer"

import DataSection from "../data-section"

const id = "unique-id"
const dois = [
  {
    id: "",
    shortname: "",
    longname: "",
    campaigns: [],
    platforms: [],
  },
]

describe("Data Section", () => {
  it("matches snapshot", () => {
    const tree = create(<DataSection id={id} dois={dois} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
