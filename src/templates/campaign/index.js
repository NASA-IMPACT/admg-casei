import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import InpageNav from "./inpage-nav"
import OverviewSection from "./overview-section"
import PlatformsSection from "./platform-section"
import ResourcesSection from "./resources-section"

const CampaignTemplate = ({ data: { campaign, platforms } }) => {
  return (
    <Layout>
      <Header
        shortname={campaign.shortname}
        longname={campaign.longname}
        focus={campaign.focus}
        countDeployments={campaign.countDeployments}
        countDataproducts={campaign.countDataproducts}
      />
      <InpageNav website={campaign.website} />
      <OverviewSection
        description={campaign.description}
        startdate={campaign.startdate}
        enddate={campaign.enddate}
        region={campaign.region}
        season={campaign.season}
        bounds={campaign.bounds}
        focusPenomena={campaign.focusPenomena}
        keywords={campaign.keywords}
      />
      <section id="milestones" data-cy="milestones-section">
        <h2>Milestones</h2>
      </section>
      <PlatformsSection platforms={platforms} />
      <section id="data" data-cy="data-section">
        <h2>Data</h2>
      </section>
      <ResourcesSection
        logo={campaign.logo}
        logoAlt={campaign.logoAlt}
        fundingAgency={campaign.fundingAgency}
        fundingProgram={campaign.fundingProgram}
        supportedMission={campaign.supportedMission}
        programLead={campaign.programLead}
        campaignLead={campaign.campaignLead}
        dataManager={campaign.dataManager}
        archive={campaign.archive}
        partnerOrg={campaign.partnerOrg}
        partnerWebsite={campaign.partnerWebsite}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $platforms: [String!]) {
    campaign: campaignCsv(id: { eq: $slug }) {
      ...headerFields
      website: Repository_Primary_Website__DAAC_homepage_
      ...overviewFields
      ...resourcesFields
    }
    platforms: allPlatformCsv(
      filter: { ADMG_s_Platform_Shortname: { in: $platforms } }
    ) {
      ...platformFragment
    }
  }
`

export default CampaignTemplate
