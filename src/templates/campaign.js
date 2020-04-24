import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>{data.campaign.shortname}</h1>
        <h2>{data.campaign.longname}</h2>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    campaign: campaignCsv(id: { eq: $slug }) {
      shortname: Campaign_Shortname
      longname: Campaign_Longname
    }
  }
`
