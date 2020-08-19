import React from "react"
import renderer from "react-test-renderer"
import * as Gatsby from "gatsby"

import Campaigns from "../explore/campaigns"
import { selector } from "../../utils/filter-utils"
import { query, location, site, images } from "../../../test/__fixtures__"

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery")
useStaticQuery.mockImplementation(() => ({
  site,
  images,
}))

describe("Campaigns page", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Campaigns data={query} location={location} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe("selector", () => {
  it("has two selector funtions", () => {
    const functions = selector()
    expect(Object.keys(functions)).toHaveLength(2)
  })
})
