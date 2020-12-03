import React from "react"
import renderer from "react-test-renderer"
import * as Gatsby from "gatsby"

import Explore from "../explore"
import { selector } from "../../utils/filter-utils"
import {
  query,
  location,
  site,
  images,
  staticQueries,
} from "../../../test/__fixtures__"

const useStaticQuery = jest.spyOn(Gatsby, "useStaticQuery")
useStaticQuery.mockImplementation(() => ({
  site,
  images,
  ...staticQueries.data,
}))

describe("Explore page", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Explore data={query.data} location={location} />)
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
