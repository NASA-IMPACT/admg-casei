import React from "react"
import { create } from "react-test-renderer"

import OverviewSection from "../overview-section"

const id = "unique-id"
const measurementType = {
  id: "test",
  longname: "test",
}
const radiometricFrequency = "test"
const temporalResolution = "test"
const spatialResolution = "test"
const calibration = "http://dx.doi.org/10.5067/calibration"
const measurementRegions = [
  {
    id: "test",
    longname: "test",
  },
  {
    id: "test2",
    longname: "test2",
  },
]
const gcmdPhenomenas = [
  {
    term: "test",
    topic: "test",
    variable_1: "test",
    variable_2: "test",
    variable_3: "test",
  },
]
const instrumentDoi = "http://dx.doi.org/10.5067/instrument"
const instrumentManufacturer = "test"
const fundingSource = "test"
const leadInvestigator = "test"
const technicalContact = "test"
const onlineInformation = ["http://www.example.com"]
const overviewPublication = "test"
const repositories = [
  {
    id: "test",
    longname: "test",
  },
  {
    id: "test2",
    longname: "test2",
  },
]

describe("Overview Section", () => {
  it("displays content", () => {
    const tree = create(
      <OverviewSection
        id={id}
        measurementType={measurementType}
        radiometricFrequency={radiometricFrequency}
        temporalResolution={temporalResolution}
        spatialResolution={spatialResolution}
        calibration={calibration}
        measurementRegions={measurementRegions}
        gcmdPhenomenas={gcmdPhenomenas}
        instrumentDoi={instrumentDoi}
        instrumentManufacturer={instrumentManufacturer}
        fundingSource={fundingSource}
        leadInvestigator={leadInvestigator}
        technicalContact={technicalContact}
        onlineInformation={onlineInformation}
        overviewPublication={overviewPublication}
        repositories={repositories}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
