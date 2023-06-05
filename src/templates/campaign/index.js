import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import SEO from "../../components/seo"
import CampaignHero from "./hero"
import InpageNav from "../../components/inpage-nav"
import OverviewSection from "./overview-section"
import FocusSection from "./focus-section"
import PlatformSection from "./platform-section"
import TimelineSection from "./timeline-section"
import DataSection from "../../components/data-section"
import ProgramInfoSection from "./program-info-section"
// import OtherResourcesSection from "./other-resources-section"
import MaintenanceSection from "../../components/maintenance-section"

const CampaignTemplate = ({ data: { campaign }, path }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    // useEffect only runs client-side after rehyration
    setIsClient(true)
  }, [])

  const bounds = []

  const sections = {
    overview: {
      nav: "Overview",
      component: OverviewSection,
      props: {
        aliases: campaign.aliases,
        description: campaign.description,
        startdate: campaign.startdate,
        enddate: campaign.enddate,
        region: campaign.region,
        seasonListing: campaign.seasons.map(x => x.shortname).join(", "),
        doi: campaign.doi,
        notesPublic: campaign.notesPublic,
        repositories: campaign.repositories,
        websites: campaign.websites,
      },
    },
    focus: {
      nav: "Focus",
      component: FocusSection,
      props: {
        focus: campaign.focus,
        geophysical: campaign.geophysical,
        focusPhenomena: campaign.focusPhenomena.split(","),
        missions: campaign.missions.split(",").filter(x => x),
      },
    },
    platform: {
      nav: "Platforms & Instruments",
      component: PlatformSection,
      props: {
        collectionPeriods: campaign.deployments.flatMap(
          d => d.collectionPeriods
        ),
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
        dois: campaign.dois,
        filterBy: ["platforms", "instruments"],
        category: "campaign",
      },
    },
    "program-info": {
      nav: "Program Info",
      component: ProgramInfoSection,
      props: {
        logoFullWidth: campaign.logoFullWidth,
        fundingAgency: campaign.fundingAgency,
        fundingProgram: campaign.fundingProgram,
        programLead: campaign.programLead,
        leadInvestigator: campaign.leadInvestigator,
        dataManager: campaign.dataManager,
        partnerOrgListing: campaign.partnerOrgs
          .map(x => x.shortname)
          .join(", "),
        partnerWebsite: campaign.partnerWebsite,
        websites: campaign.websites,
      },
    },
    // "other-resources": {
    //   nav: "Other",
    //   component: OtherResourcesSection,
    //   props: {
    //     resources: parseTextToList(campaign.resources),
    //   },
    // },
  }

  return (
    <Layout>
      <SEO title={campaign.shortname} lang="en" />
      <CampaignHero
        bounds={bounds}
        longname={campaign.longname}
        shortname={campaign.shortname}
        focusListing={campaign.focus.map(x => x.shortname).join(", ")}
        countDeployments={campaign.countDeployments}
        countCollectionPeriods={campaign.countCollectionPeriods}
        countDataProducts={campaign.countDataProducts}
        deployments={campaign.deployments}
        logo150h={campaign.logo150h}
      />
      <PageBody id="campaign">
        <InpageNav
          shortname={campaign.shortname}
          items={Object.entries(sections).map(([id, section]) => ({
            id,
            label: section.nav,
          }))}
          path={path}
        />
        {Object.entries(sections).map(([id, section]) => (
          <section.component key={id} id={id} {...section.props} />
        ))}
        {isClient && (
          // the maintenance section is behind authentication and only accessible from the browser
          <MaintenanceSection
            shortname={campaign.shortname}
            data={{ campaign }}
          />
        )}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query ($slug: String!) {
    campaign: campaign(id: { eq: $slug }) {
      ...heroFields
      ...overviewFields
      ...focusFields
      ...platformSectionFields
      deployments {
        id: uuid
        spatial_bounds: spatial_bounds
        iops: iops {
          id
          short_name
          start_date
          description
          end_date
        }
        longname: long_name
        shortname: short_name
        aliases: aliases {
          shortname: short_name
        }
        regions: geographical_regions {
          short_name
        }
        collectionPeriods: collection_periods {
          id
          platform: platform {
            id
            shortname: short_name
          }
          instruments: instruments {
            id
            shortname: short_name
            longname: long_name
            description
            gcmdPhenomena: gcmd_phenomena {
              id
              category
              term
              topic
              variable_1
              variable_2
              variable_3
            }
          }
        }
        end: end_date
        start: start_date
        events: significant_events {
          end: end_date
          start: start_date
          shortname: short_name
          description: description
          id
        }
      }
      dois {
        cmrTitle: cmr_entry_title
        doi
        id
        longname: long_name
        campaigns {
          id
          shortname: short_name
          longname: long_name
        }
        platforms {
          id
          shortname: short_name
          longname: long_name
        }
        instruments {
          id
          shortname: short_name
          longname: long_name
        }
      }
      ...fundingFields
      uuid
    }
  }
`

CampaignTemplate.propTypes = {
  data: PropTypes.shape({
    campaign: PropTypes.shape({
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
      aliases: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
        }).isRequired
      ),
      description: PropTypes.string.isRequired,
      startdate: PropTypes.string.isRequired,
      enddate: PropTypes.string,
      region: PropTypes.string.isRequired,
      seasons: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      doi: PropTypes.string.isRequired,
      notesPublic: PropTypes.string.isRequired,
      repositories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
      websites: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
          url: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
      missions: PropTypes.string,
      focusPhenomena: PropTypes.string.isRequired,
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          image: PropTypes.shape({
            description: PropTypes.string,
            gatsbyImg: PropTypes.shape({
              childImageSharp: PropTypes.object,
            }),
          }),
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
          dois: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
            }).isRequired
          ),
        }).isRequired
      ).isRequired,
      deployments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          aliases: PropTypes.array.isRequired,
          flights: PropTypes.array,
          region: PropTypes.array,
          campaign: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
          start: PropTypes.string.isRequired,
          collection_periods: PropTypes.shape({
            id: PropTypes.string.isRequired,
          }),
        }).isRequired
      ).isRequired,
      dois: PropTypes.arrayOf(
        PropTypes.shape({
          cmrTitle: PropTypes.string.isRequired,
          doi: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
      logo150h: PropTypes.shape({
        description: PropTypes.string.isRequired,
        gatsbyImg: PropTypes.shape({
          childImageSharp: PropTypes.object,
        }),
      }),
      logoFullWidth: PropTypes.shape({
        description: PropTypes.string.isRequired,
        gatsbyImg: PropTypes.shape({
          childImageSharp: PropTypes.object,
        }),
      }),
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
      resources: PropTypes.string,
      uuid: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
}

export default CampaignTemplate
