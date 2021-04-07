import React from "react"
import renderer from "react-test-renderer"
import * as Gatsby from "gatsby"

import Milestone from "../milestone"

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery")
useStaticQuery.mockImplementation(() => ({
  deploymentPlaceholder: {
    nasaImgAlt:
      "NASA’s Global Hawk aircraft being deployed to Florida from Armstrong Flight Research Center",
    nasaImg: {
      childImageSharp: {
        fluid: {
          base64: "data:image/jpeg;base64,/9j/2wBDABALDA4M",
        },
      },
    },
    shortname: "placeholder-deployment",
  },
}))

describe("MileStone", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Milestone
          key="f2c42b8a-2c06-407c-9345-aa9824ac65f5"
          type="deployment"
          daterange="10/02/2012 - 10/20/2012"
          name="Canada, Oregon Fall 2012"
          details="2 Flights"
          region="Canada"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
