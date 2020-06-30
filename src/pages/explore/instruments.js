import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import ExploreMenu from "../../components/explore-menu"
import ExploreSection from "../../components/explore-section"

export default function Instruments({ data }) {
  console.log("data", data)
  return (
    <Layout>
      <ExploreMenu />
      <ExploreSection category="instruments" />
    </Layout>
  )
}

export const query = graphql`
  query {
    all: allInstrument(sort: { order: ASC, fields: short_name }) {
      totalCount
    }
  }
`
