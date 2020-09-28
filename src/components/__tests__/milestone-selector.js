import React from "react"
import renderer from "react-test-renderer"
import MilestoneSelector from "../timeline/milestone-selector"

const testEvents = [
  {
    campaign: "c0dc0d63-e32a-4fdc-b1ac-4f0e8a5c7754",
    end: "2012-09-20",
    collectionPeriods: [
      { id: "8864fcb5-444c-4fd7-826b-0240bcf124cd" },
      { id: "de7a9541-a67d-4ba3-ae77-5a8856bb549e" },
      { id: "545d68d7-9787-4435-956d-9bd663bb2224" },
    ],
    id: "f2c42b8a-2c06-407c-9345-aa9824ac65f5",
    longname: "Western US Fall 2012",
    region: [],
    shortname: "AirMOSS_dep_2012a",
    start: "2012-09-18",
  },
  {
    campaign: "c0dc0d63-e32a-4fdc-b1ac-4f0e8a5c7754",
    end: "2012-10-20",
    collectionPeriods: [
      { id: "1e2f5b99-78f6-4b40-b634-67957fa26311" },
      { id: "6ca9f494-7948-4b42-bf5c-956b0d7cf0b9" },
    ],
    id: "9f98f6f9-ea1b-4ef7-a891-8fb175bf1df5",
    longname: "Canada, Oregon Fall 2012",
    region: [],
    shortname: "AirMOSS_dep_2012b",
    start: "2012-10-02",
  },
]
const testId = "test id"
const testAction = () => {}

describe("Timeline", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <MilestoneSelector
          events={testEvents}
          timelineAction={testAction}
          activeMilestone={testId}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
