import React from "react"
import renderer from "react-test-renderer"
import * as Gatsby from "gatsby"

import Home from "../index"
import Explore from "../explore"
import Glossary from "../glossary"

import {
  homeQuery,
  glossaryQuery,
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

describe("Home page", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Home data={homeQuery.data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe("Explore page", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Explore data={query.data} location={location} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe("Glossary page", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Glossary data={glossaryQuery.data} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
