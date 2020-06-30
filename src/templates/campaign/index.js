import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import InpageNav from "./inpage-nav"
import OverviewSection from "./overview-section"
import TimelineSection from "./timeline-section"
import PlatformSection from "./platform-section"
import ProgramInfoSection from "./program-info-section"
import FocusSection from "./focus-section"
import SectionBlock from "../../components/section/section-block"

const CampaignTemplate = ({ data: { campaign, deployments, platforms } }) => {
  return (
    <Layout>
      <Header
        bounds={campaign.bounds}
        shortname={campaign.shortname}
        longname={campaign.longname}
        focusIds={campaign.focus}
        countDeployments={campaign.countDeployments}
        countCollectionPeriods={campaign.countCollectionPeriods}
        countDataProducts={campaign.countDataProducts}
      />
      <InpageNav />
      <OverviewSection
        description={campaign.description}
        startdate={campaign.startdate}
        enddate={campaign.enddate}
        region={campaign.region}
        season={campaign.seasons.map(x => x.shortname).join(", ")}
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
      <SectionBlock headline="Data" id="data" />
      <ProgramInfoSection
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
      countCollectionPeriods: PropTypes.number.isRequired,
      countDataProducts: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      startdate: PropTypes.string.isRequired,
      enddate: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      seasons: PropTypes.arrayOf(PropTypes.string).isRequired,
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
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          flights: PropTypes.array.isRequired,
          region: PropTypes.array.isRequired,
          campaign: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
          start: PropTypes.string.isRequired,
        })
      ),
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
