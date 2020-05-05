import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import NorthAmerica from "../data/north-america.svg"

const StatNumber = ({ number = "--", label }) => (
  <>
    <dd style={{ fontSize: `3rem` }}>{number.length === 0 ? "--" : number}</dd>
    <dt style={{ gridRowStart: 2, textTransform: `uppercase` }}>{label}</dt>
  </>
)

const InpageLink = props => (
  <li style={{ margin: `0 1rem 0 0` }}>
    <a href={props.to}>{props.children}</a>
  </li>
)

const CampaignTemplate = ({ data: { campaign } }) => {
  return (
    <Layout>
      <header style={{ display: `flex` }}>
        <div style={{ flex: `1.61803398875` }}>
          <div>
            <p>{campaign.shortname}</p>
            <h1>{campaign.longname}</h1>
            <p>{campaign.focus}</p>
          </div>
          <dl style={{ display: `grid` }} data-cy="stats">
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
      <div
        style={{
          display: `flex`,
          padding: `1rem`,
          borderTop: `1px solid #9E9E9E`,
          borderBottom: `1px solid #9E9E9E`,
          justifyContent: `space-between`,
          alignItems: `center`,
        }}
      >
        <nav role="inpage-scroll">
          <ul
            style={{
              display: `flex`,
              flexDirection: `row`,
              justifyContent: `flex-start`,
              margin: 0,
              listStyle: `none`,
            }}
          >
            <InpageLink to="#overview">Overview</InpageLink>
            <InpageLink to="#milestones">Milestones</InpageLink>
            <InpageLink to="#platforms">Platforms & Instruments</InpageLink>
            <InpageLink to="#data">Data</InpageLink>
            <InpageLink to="#resources">Resources</InpageLink>
          </ul>
        </nav>
        <div style={{ display: `flex` }}>
          <div style={{ padding: `0 1rem`, borderLeft: `1px solid #9E9E9E` }}>
            <a href={campaign.website}>Primary Website</a>
          </div>
          <div style={{ padding: `0 1rem`, borderLeft: `1px solid #9E9E9E` }}>
            <a href={campaign.website}>Data</a>
          </div>
        </div>
      </div>
      <section id="overview">
        <h2>Overview</h2>
      </section>
      <section id="milestones">
        <h2>Milestones</h2>
      </section>
      <section id="platforms">
        <h2>Platforms & Instruments</h2>
      </section>
      <section id="data">
        <h2>Data</h2>
      </section>
      <section id="resources">
        <h2>Additional Information</h2>
      </section>
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
      website: Repository_Primary_Website__DAAC_homepage_
    }
  }
`

export default CampaignTemplate
