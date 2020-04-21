import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>{data.campaignCsv.short_name}</h1>
        <h2>{data.campaignCsv.long_name}</h2>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    campaignCsv(id: { eq: $slug }) {
      short_name
      long_name
    }
  }
`
