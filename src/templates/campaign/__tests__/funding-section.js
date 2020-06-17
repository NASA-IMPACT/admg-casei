import React from "react"
import { create } from "react-test-renderer"
import { useStaticQuery } from "gatsby"

import FundingSection from "../funding-section"

const testLogo = "https://via.placeholder.com/150"
const testString = "test string"
const testArray = ["a", "b"]

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => {
    return {
      allPartnerOrg: {
        nodes: [
          {
            id: "a",
            website: "website a",
            short_name: "org a",
            long_name: "org a",
          },
        ],
      },
    }
  })
})

describe("Funding Section", () => {
  it("renders logo when present in props", () => {
    const tree = create(
      <FundingSection
        logo={testLogo}
        fundingAgency={testString}
        fundingProgram={testString}
        programLead={testString}
        leadInvestigator={testString}
        dataManager={testString}
        archive={testString}
        partnerOrgIds={testArray}
        partnerWebsite={testString}
        tertiaryWebsite={testString}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("renders placeholder when no logo is available", () => {
    const tree = create(
      <FundingSection
        fundingAgency={testString}
        fundingProgram={testString}
        programLead={testString}
        leadInvestigator={testString}
        dataManager={testString}
        archive={testString}
        partnerOrgIds={testArray}
        partnerWebsite={testString}
        tertiaryWebsite={testString}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
