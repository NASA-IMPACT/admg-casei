import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import InpageNav from "./inpage-nav"
import OverviewSection from "./overview-section"
import MilestoneSection from "./milestone-section"
import PlatformSection from "./platform-section"
import ResourcesSection from "./resources-section"

const CampaignTemplate = ({ data: { campaign, deployments, platforms } }) => {
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
      <MilestoneSection deployments={deployments} />
      <PlatformSection platforms={platforms} />
      <section className="inpage-nav" id="data" data-cy="data-section">
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
  query($slug: String!, $shortname: String!, $platforms: [String!]) {
    campaign: campaign(id: { eq: $slug }) {
      ...headerFields
      website: project_website
      ...overviewFields
      ...resourcesFields
    }
    deployments: allDeploymentCsv(
      filter: { campaign_shortname: { eq: $shortname } }
    ) {
      ...deploymentFragment
    }
    platforms: allPlatformCsv(
      filter: { ADMG_s_Platform_Shortname: { in: $platforms } }
    ) {
      ...platformFragment
    }
  }
`

export default CampaignTemplate
