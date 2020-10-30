import React from "react"
import { create } from "react-test-renderer"

import ProgramInfoSection from "../program-info-section"

const testString = "test string"
const testUrl = "https://www.test-campaign.io"
const testImage = {
  shortname: "ACES",
  logoAlt: "logo",
  category: "logo",
  logoImg: {
    childImageSharp: {
      fluid: {
        tracedSVG:
          "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'",
        srcWebp:
          "/static/070840eb6299020cd65fd46e27c54400/36436/aces_logo.webp",
        srcSetWebp:
          "/static/070840eb6299020cd65fd46e27c54400/36436/aces_logo.webp 141w",
        srcSet:
          "/static/070840eb6299020cd65fd46e27c54400/29ce4/aces_logo.png 141w",
        sizes: "(max-width: 141px) 100vw, 141px",
        src: "/static/070840eb6299020cd65fd46e27c54400/29ce4/aces_logo.png",
        presentationHeight: 139,
        presentationWidth: 141,
        originalName: "aces_logo.png",
        originalImg:
          "/static/070840eb6299020cd65fd46e27c54400/29ce4/aces_logo.png",
        base64: "data:image/png;base64,iVBOR",
        aspectRatio: 1.014388489208633,
      },
    },
  },
}

describe("Program Info Section", () => {
  it("renders logo when present in props", () => {
    const component = create(
      <ProgramInfoSection
        id="program-info"
        logo={testImage}
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
    expect(instance.findAllByType("img")[0].props.alt).toBe(testImage.logoAlt)
    expect(tree).toMatchSnapshot()
  })
  it("renders placeholder when no logo is available", () => {
    const component = create(
      <ProgramInfoSection
        id="program-info"
        logo={{
          shortname: "GOES-R PLT",
          logoAlt: "GOES-R PLT logo",
          category: "logo",
          logoImg: null,
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
    expect(instance.findByType("img").props.src).toBeDefined()
    expect(tree).toMatchSnapshot()
  })
})
