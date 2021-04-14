import React from "react"
import { create } from "react-test-renderer"

import ProgramInfoSection from "../program-info-section"

const testString = "test string"
const testUrl = "https://www.test-campaign.io"
const testImage = {
  shortname: "ACES",
  description: "logo",
  category: "logo",
  gatsbyImg: {
    childImageSharp: {
      gatsbyImageData: {
        layout: "fullWidth",
        backgroundColor: "#080808",
        images: {
          fallback: {
            src:
              "/static/3d17ba6135efff1e39e6b4d97157a123/893c2/3b06165b-7033-4357-8f15-d2b68cbd84ff.png",
            srcSet:
              "/static/3d17ba6135efff1e39e6b4d97157a123/893c2/3b06165b-7033-4357-8f15-d2b68cbd84ff.png 129w",
            sizes: "100vw",
          },
          sources: [
            {
              srcSet:
                "/static/3d17ba6135efff1e39e6b4d97157a123/23c0e/3b06165b-7033-4357-8f15-d2b68cbd84ff.webp 129w",
              type: "image/webp",
              sizes: "100vw",
            },
          ],
        },
        width: 1,
        height: 0.9922480620155039,
      },
    },
  },
}

describe("Program Info Section", () => {
  it("renders logo when present in props", () => {
    const component = create(
      <ProgramInfoSection
        id="program-info"
        logoFullWidth={testImage}
        shortname="AirMOSS"
        fundingAgency={testString}
        fundingProgram={testString}
        programLead={testString}
        leadInvestigator={testString}
        dataManager={testString}
        repositoryWebsite={testUrl}
        partnerOrgListing={testString}
        publicationLink={testUrl}
      />
    )
    const tree = component.toJSON()
    const instance = component.root

    expect(instance.findAllByType("img")[0].props.alt).toBe(
      testImage.description
    )
    expect(tree).toMatchSnapshot()
  })
  it("renders placeholder when no logo is available", () => {
    const component = create(
      <ProgramInfoSection
        id="program-info"
        logo={{
          shortname: "GOES-R PLT",
          description: "GOES-R PLT logo",
          category: "logo",
          gatsbyImg: null,
        }}
        shortname={testString}
        fundingAgency={testString}
        fundingProgram={testString}
        programLead={testString}
        leadInvestigator={testString}
        dataManager={testString}
        repositoryWebsite={testUrl}
        partnerOrgListing={testString}
        publicationLink={testUrl}
      />
    )
    const tree = component.toJSON()
    const instance = component.root
    expect(instance.findByType("svg")).toBeDefined()
    expect(tree).toMatchSnapshot()
  })
})
