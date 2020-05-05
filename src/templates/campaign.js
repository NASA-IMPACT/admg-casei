import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import NorthAmerica from "../data/north-america.svg"

const StatNumber = ({ number, label }) => (
  <>
    <dd style={{ fontSize: `3rem` }}>{number}</dd>
    <dt style={{ gridRowStart: 2, textTransform: `uppercase` }}>{label}</dt>
  </>
)

const CampaignTemplate = ({ data: { campaign } }) => {
  return (
    <Layout>
      <header
        style={{
          display: `flex`,
        }}
      >
        <div style={{ flex: `1.61803398875` }}>
          <div>
            <p>{campaign.shortname}</p>
            <h1>{campaign.longname}</h1>
            <p>{campaign.focus}</p>
          </div>
          <dl
            style={{
              display: `grid`,
            }}
            data-cy="stats"
          >
            <StatNumber
              number={campaign.countDeployments}
              label="Deployments"
            />
            <StatNumber number="--" label="Flights" />
            <StatNumber
              number={campaign.countDataproducts}
              label="Data Products"
            />
          </dl>
        </div>
        <div style={{ flex: `1` }}>
          <img src={NorthAmerica} alt="North America" data-cy="overview-map" />
        </div>
      </header>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    campaign: campaignCsv(id: { eq: $slug }) {
      shortname: Campaign_Shortname
      longname: Campaign_Longname
      focus: NASA_Earth_Science_Focus_Areas
      countDeployments: Number_of_Deployments
      countDataproducts: Number_of_Published_Data_Products
    }
  }
`

export default CampaignTemplate
