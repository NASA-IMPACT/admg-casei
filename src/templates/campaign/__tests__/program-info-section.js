import React from "react"
import { create } from "react-test-renderer"

import ProgramInfoSection from "../program-info-section"

const testString = "test string"
const testUrl = "https://www.test-campaign.io"

describe("Program Info Section", () => {
  it("renders logo when present in props", () => {
    const component = create(
      <ProgramInfoSection
        shortname="AirMOSS"
        fundingAgency={testString}
        fundingProgram={testString}
        programLead={testString}
        leadInvestigator={testString}
        dataManager={testString}
        archive={testUrl}
        partnerOrgListing={testString}
        tertiaryWebsite={testUrl}
      />
    )
    const tree = component.toJSON()
    const instance = component.root
    expect(instance.findByType("img").props.src).toBe(
      "https://airbornescience.jpl.nasa.gov/sites/default/files/airmossLogo.png"
    )
    expect(tree).toMatchSnapshot()
  })
  it("renders placeholder when no logo is available", () => {
    const component = create(
      <ProgramInfoSection
        shortname={testString}
        fundingAgency={testString}
        fundingProgram={testString}
        programLead={testString}
        leadInvestigator={testString}
        dataManager={testString}
        archive={testUrl}
        partnerOrgListing={testString}
        tertiaryWebsite={testUrl}
      />
    )
    const tree = component.toJSON()
    const instance = component.root
    expect(instance.findByType("img").props.src).toBeDefined()
    expect(tree).toMatchSnapshot()
  })
})
