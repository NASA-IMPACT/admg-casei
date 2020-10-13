import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import CampaignHero from "./hero"
import InpageNav from "../../components/inpage-nav"
import OverviewSection from "./overview-section"
import FocusSection from "./focus-section"
import PlatformSection from "./platform-section"
import TimelineSection from "./timeline-section"
import DataSection from "./data-section"
import ProgramInfoSection from "./program-info-section"
import MaintenanceSection from "../../components/maintenance-section"

const CampaignTemplate = ({ data: { campaign }, path }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    // useEffect only runs client-side after rehyration
    setIsClient(true)
  }, [])

  // add platform id to list of campaignDois
  const updatedCampaignDois = campaign.dois.map(doi => {
    const matchedPlatform = campaign.platforms.find(
      platform =>
        platform.dois.filter(platformDoi => platformDoi !== doi).length
    )
    return {
      ...doi,
      platformShortname: matchedPlatform.shortname,
      platformLongname: matchedPlatform.longname,
      platformId: matchedPlatform.id,
    }
  })

  console.log("updatedCampaignDois", updatedCampaignDois)

  const sections = {
    overview: {
      nav: "Overview",
      component: OverviewSection,
      props: {
        description: campaign.description,
        startdate: campaign.startdate,
        enddate: campaign.enddate,
        region: campaign.region,
        seasonListing: campaign.seasons.map(x => x.shortname).join(", "),
        bounds: campaign.bounds,
        doi: campaign.doi,
        projectWebsite: campaign.projectWebsite,
        repositoryWebsite: campaign.repositoryWebsite,
        tertiaryWebsite: campaign.tertiaryWebsite,
        publicationLink: campaign.publicationLink,
      },
    },
    focus: {
      nav: "Focus",
      component: FocusSection,
      props: {
        focus: campaign.focus,
        geophysical: campaign.geophysical,
        focusPhenomena: campaign.focusPhenomena,
      },
    },
    platform: {
      nav: "Platforms & Instruments",
      component: PlatformSection,
      props: {
        platforms: campaign.platforms,
        instruments: campaign.instruments,
      },
    },
    timeline: {
      nav: "Timeline",
      component: TimelineSection,
      props: {
        deployments: campaign.deployments,
      },
    },
    data: {
      nav: "Data",
      component: DataSection,
      props: {
        dois: updatedCampaignDois,
      },
    },
    "program-info": {
      nav: "Program Info",
      component: ProgramInfoSection,
      props: {
        logo: campaign.logo,
        fundingAgency: campaign.fundingAgency,
        fundingProgram: campaign.fundingProgram,
        programLead: campaign.programLead,
        leadInvestigator: campaign.leadInvestigator,
        dataManager: campaign.dataManager,
        repositoryWebsite: campaign.repositoryWebsite,
        partnerOrgListing: campaign.partnerOrgs
          .map(x => x.shortname)
          .join(", "),
        partnerWebsite: campaign.partnerWebsite,
        publicationLink: campaign.publicationLink,
      },
    },
  }

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
        logo={campaign.logo}
      />
      <InpageNav
        shortname={campaign.shortname}
        items={Object.entries(sections).map(([id, section]) => ({
          id,
          label: section.nav,
        }))}
        path={path}
      />
      <PageBody id="campaign">
        {Object.entries(sections).map(([id, section]) => (
          <section.component key={id} id={id} {...section.props} />
        ))}
        {isClient && (
          // the maintenance section is behind authentication and only accessible from the browser
          <MaintenanceSection id={campaign.uuid} data={{ campaign }} />
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
      ...deploymentFields
      ...dataFields
      ...fundingFields
      uuid
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
          id: PropTypes.string.isRequired,
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
      doi: PropTypes.string.isRequired,
      projectWebsite: PropTypes.string.isRequired,
      repositoryWebsite: PropTypes.string.isRequired,
      tertiaryWebsite: PropTypes.string.isRequired,
      publicationLink: PropTypes.string.isRequired,
      focusPhenomena: PropTypes.string.isRequired,
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          image: PropTypes.shape({
            nasaImgAlt: PropTypes.string.isRequired,
            nasaImg: PropTypes.shape({
              childImageSharp: PropTypes.object.isRequired,
            }).isRequired,
          }).isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
          instruments: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              shortname: PropTypes.string.isRequired,
            }).isRequired
          ).isRequired,
          dois: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
            }).isRequired
          ),
        }).isRequired
      ).isRequired,
      instruments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
      deployments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          flights: PropTypes.array,
          region: PropTypes.array,
          campaign: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
          start: PropTypes.string.isRequired,
          collection_periods: PropTypes.shape({
            id: PropTypes.string.isRequired,
          }),
        }).isRequired
      ).isRequired,
      dois: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
      logo: PropTypes.shape({
        nasaImgAlt: PropTypes.string.isRequired,
        nasaImg: PropTypes.shape({
          childImageSharp: PropTypes.object,
        }),
      }).isRequired,
      fundingAgency: PropTypes.string.isRequired,
      fundingProgram: PropTypes.string.isRequired,
      programLead: PropTypes.string.isRequired,
      leadInvestigator: PropTypes.string.isRequired,
      dataManager: PropTypes.string.isRequired,
      partnerOrgs: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
        })
      ).isRequired,
      partnerWebsite: PropTypes.string,
      uuid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
}

export default CampaignTemplate
