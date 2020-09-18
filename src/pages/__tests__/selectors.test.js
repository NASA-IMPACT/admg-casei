import React from "react"
import renderer from "react-test-renderer"
import * as Gatsby from "gatsby"

import Campaigns from "../explore/campaigns"
import { selector } from "../../utils/filter-utils"
import {
  campaignsQuery,
  location,
  site,
  images,
  staticQueries,
} from "../../../test/__fixtures__"

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery")
useStaticQuery.mockImplementation(() => ({
  site,
  images,
  ...staticQueries,
}))

describe("Campaigns page", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Campaigns data={campaignsQuery} location={location} />)
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
