import React from "react"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import InpageNav from "./inpage-nav"
import OverviewSection from "./overview-section"
import TimelineSection from "./timeline-section"
import PlatformSection from "./platform-section"
import FundingSection from "./funding-section"
import FocusSection from "./focus-section"

const CampaignTemplate = ({ data: { campaign, deployments, platforms } }) => {
  return (
    <Layout>
      <Header
        shortname={campaign.shortname}
        longname={campaign.longname}
        focusIds={campaign.focus}
        countDeployments={deployments.totalCount}
        countDataproducts={campaign.countDataproducts}
      />
      <InpageNav website={campaign.website} />
      <OverviewSection
        description={campaign.description}
        startdate={campaign.startdate}
        enddate={campaign.enddate}
        region={campaign.region}
        seasonIds={campaign.season}
        bounds={campaign.bounds}
        focusPenomena={campaign.focusPenomena}
        keywordIds={campaign.keywords}
        website={campaign.website}
      />
      <FocusSection
        focusAreaIds={campaign.focusAreaIds}
        focusPhenomena={campaign.focusPhenomena}
        scienceKeywords={campaign.scienceKeywords}
      />
      <PlatformSection platforms={platforms} />
      <TimelineSection deployments={deployments} />
      <section className="inpage-nav" id="data" data-cy="data-section">
        <h2>Data</h2>
      </section>
      <FundingSection
        logo={campaign.logo}
        logoAlt={campaign.logoAlt}
        fundingAgency={campaign.fundingAgency}
        fundingProgram={campaign.fundingProgram}
        supportedMission={campaign.supportedMission}
        programLead={campaign.programLead}
        campaignLead={campaign.campaignLead}
        dataManager={campaign.dataManager}
        archive={campaign.archive}
        partnerOrgIds={campaign.partnerOrg}
        partnerWebsite={campaign.partnerWebsite}
      />
    </Layout>
  )
}

export default CampaignTemplate

export const query = graphql`
  query($slug: String!, $platforms: [String!]) {
    campaign: campaign(id: { eq: $slug }) {
      ...headerFields
      ...overviewFields
      ...focusFields
      ...fundingFields
    }
    deployments: allDeployment(filter: { campaign: { eq: $slug } }) {
      totalCount
      ...deploymentFragment
    }
    platforms: allPlatform(filter: { id: { in: $platforms } }) {
      ...platformFragment
    }
  }
`
