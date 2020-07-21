import React from "react"
import { create } from "react-test-renderer"

import PlatformSection from "../platform-section"
jest.mock("../../../components/image", () => {
  const mockImage = () => <img />
  return mockImage
})

const testArray = [
  {
    id: "d59b3d7e-f782-4e25-a8eb-ceec91c0331e",
    shortname: "DC-8",
    longname: "Douglas DC-8",
  },
  {
    id: "1b607095-4f6d-4e70-8e16-798bc59a2d59",
    shortname: "B-200",
    longname: "Beechcraft King Air B-200",
  },
  {
    id: "2084ab0c-4f18-4aa6-ad7b-70bc861d2d80",
    shortname: "P-3",
    longname: "P-3 Orion",
  },
]

describe("Platform Section", () => {
  it("displays content", () => {
    const tree = create(<PlatformSection platforms={testArray} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
