import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import CampaignHero from "./hero"
import InpageNav from "./inpage-nav"
import OverviewSection from "./overview-section"
import TimelineSection from "./timeline-section"
import PlatformSection from "./platform-section"
import ProgramInfoSection from "./program-info-section"
import FocusSection from "./focus-section"
import { SectionBlock, SectionHeader } from "../../components/section"
import MaintenanceSection from "../../components/maintenance-section"

const CampaignTemplate = ({ data: { campaign, deployments } }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    // useEffect only runs client-side after rehyration
    setIsClient(true)
  }, [])

  return (
    <Layout>
      <CampaignHero
        bounds={campaign.bounds}
        shortname={campaign.shortname}
        longname={campaign.longname}
        focusListing={campaign.focus.map(x => x.shortname).join(", ")}
        countDeployments={campaign.countDeployments}
        countCollectionPeriods={campaign.countCollectionPeriods}
        countDataProducts={campaign.countDataProducts}
      />
      <PageBody id="campaign">
        <InpageNav />
        <OverviewSection
          description={campaign.description}
          startdate={campaign.startdate}
          enddate={campaign.enddate}
          region={campaign.region}
          seasonListing={campaign.seasons.map(x => x.shortname).join(", ")}
          bounds={campaign.bounds}
          projectWebsite={campaign.projectWebsite}
          repositoryWebsite={campaign.repositoryWebsite}
          tertiaryWebsite={campaign.tertiaryWebsite}
          publicationLink={campaign.publicationLink}
        />
        <FocusSection
          focus={campaign.focus}
          geophysical={campaign.geophysical}
          focusPhenomena={campaign.focusPhenomena}
        />
        <PlatformSection platforms={campaign.platforms} />
        <TimelineSection deployments={deployments} />
        <SectionBlock id="data">
          <SectionHeader headline="Data" />
        </SectionBlock>
        <ProgramInfoSection
          logo={campaign.logo}
          fundingAgency={campaign.fundingAgency}
          fundingProgram={campaign.fundingProgram}
          programLead={campaign.programLead}
          leadInvestigator={campaign.leadInvestigator}
          dataManager={campaign.dataManager}
          archive={campaign.archive}
          partnerOrgListing={campaign.partnerOrgs
            .map(x => x.shortname)
            .join(", ")}
          partnerWebsite={campaign.partnerWebsite}
          tertiaryWebsite={campaign.tertiaryWebsite}
        />
        {isClient && (
          // the maintenance section is behind authentication and only accessible from the browser
          <MaintenanceSection
            id={campaign.uuid}
            data={{ campaign, deployments }}
          />
        )}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    campaign: campaign(id: { eq: $slug }) {
      ...heroFields
      ...overviewFields
      ...focusFields
      ...platformFields
      ...fundingFields
      uuid
    }
    deployments: allDeployment(filter: { campaign: { eq: $slug } }) {
      ...deploymentFragment
    }
  }
`

CampaignTemplate.propTypes = {
  data: PropTypes.shape({
    campaign: PropTypes.shape({
      bounds: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      focus: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      geophysical: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      countDeployments: PropTypes.number,
      countCollectionPeriods: PropTypes.number.isRequired,
      countDataProducts: PropTypes.number,
      description: PropTypes.string.isRequired,
      startdate: PropTypes.string.isRequired,
      enddate: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      seasons: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      projectWebsite: PropTypes.string.isRequired,
      repositoryWebsite: PropTypes.string.isRequired,
      tertiaryWebsite: PropTypes.string.isRequired,
      publicationLink: PropTypes.string.isRequired,
      focusPhenomena: PropTypes.string.isRequired,
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      logo: PropTypes.string,
      fundingAgency: PropTypes.string.isRequired,
      fundingProgram: PropTypes.string.isRequired,
      programLead: PropTypes.string.isRequired,
      leadInvestigator: PropTypes.string.isRequired,
      dataManager: PropTypes.string.isRequired,
      archive: PropTypes.string.isRequired,
      partnerOrgs: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
        })
      ).isRequired,
      partnerWebsite: PropTypes.string,
      uuid: PropTypes.string.isRequired,
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
  }).isRequired,
}

export default CampaignTemplate
