import React from "react"
import PropTypes from "prop-types"
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
      <InpageNav />
      <OverviewSection
        description={campaign.description}
        startdate={campaign.startdate}
        enddate={campaign.enddate}
        region={campaign.region}
        seasonIds={campaign.season}
        bounds={campaign.bounds}
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
        fundingAgency={campaign.fundingAgency}
        fundingProgram={campaign.fundingProgram}
        programLead={campaign.programLead}
        leadInvestigator={campaign.leadInvestigator}
        dataManager={campaign.dataManager}
        archive={campaign.archive}
        partnerOrgIds={campaign.partnerOrg}
        partnerWebsite={campaign.partnerWebsite}
        tertiaryWebsite={campaign.tertiaryWebsite}
      />
    </Layout>
  )
}

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

CampaignTemplate.propTypes = {
  data: PropTypes.shape({
    campaign: PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      focus: PropTypes.arrayOf(PropTypes.string).isRequired,
      countDeployments: PropTypes.number,
      countDataproducts: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      startdate: PropTypes.string.isRequired,
      enddate: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      season: PropTypes.arrayOf(PropTypes.string).isRequired,
      bounds: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
      focusAreaIds: PropTypes.arrayOf(PropTypes.string).isRequired,
      focusPhenomena: PropTypes.string.isRequired,
      scienceKeywords: PropTypes.string,
      logo: PropTypes.string,
      fundingAgency: PropTypes.string.isRequired,
      fundingProgram: PropTypes.string.isRequired,
      programLead: PropTypes.string.isRequired,
      leadInvestigator: PropTypes.string.isRequired,
      dataManager: PropTypes.string.isRequired,
      archive: PropTypes.string.isRequired,
      partnerOrg: PropTypes.arrayOf(PropTypes.string).isRequired,
      partnerWebsite: PropTypes.string,
      tertiaryWebsite: PropTypes.string.isRequired,
    }).isRequired,
    deployments: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
    platforms: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string,
          longname: PropTypes.string,
        }).isRequired
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default CampaignTemplate
