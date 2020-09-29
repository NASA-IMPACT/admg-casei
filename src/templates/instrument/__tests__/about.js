import React from "react"
import { create } from "react-test-renderer"

import About from "../about"

const instrumentTypes = [
  {
    id: "test",
    longname: "test",
  },
  {
    id: "test2",
    longname: "test2",
  },
]
const radiometricFrequency = "test"
const temporalResolution = "test"
const spatialResolution = "test"
const calibration = "test"
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
const instrumentDoi = "test"
const instrumentManufacturer = "test"
const fundingSource = "test"
const leadInvestigator = "test"
const technicalContact = "test"
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

describe("About Section", () => {
  it("displays content", () => {
    const tree = create(
      <About
        instrumentTypes={instrumentTypes}
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
        overviewPublication={overviewPublication}
        repositories={repositories}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
