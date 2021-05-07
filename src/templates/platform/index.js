import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import SEO from "../../components/seo"
import PlatformHero from "./hero"
import InpageNav from "../../components/inpage-nav"
import OverviewSection from "./overview-section"
import CampaignsAndInstruments from "./campaigns-instruments"
import DataSection from "../../components/data-section"

export default function PlatformTemplate({ data: { platform }, path }) {
  const sections = {
    overview: {
      nav: "Overview",
      component: OverviewSection,
      props: {
        description: platform.description,
        shortname: platform.shortname,
        onlineInformation: platform.onlineInformation
          .split("\n")
          .filter(x => x),
      },
    },
    "campaigns-instruments": {
      nav: "Related Campaigns & Instruments",
      component: CampaignsAndInstruments,
      props: {
        id: "campaigns-instruments",
        campaigns: platform.campaigns,
        instruments: platform.instruments,
      },
    },
    data: {
      nav: "Data",
      component: DataSection,
      props: {
        dois: platform.dois,
        filterBy: ["campaigns", "instruments"],
        category: "platform",
      },
    },
  }

  return (
    <Layout isHeaderFixed>
      <SEO title={platform.shortname} lang="en" />

      <PlatformHero
        shortname={platform.shortname}
        longname={platform.longname}
        campaigns={platform.campaigns.length}
        collectionPeriods={platform.collectionPeriods.length}
        textToImageRatio={[3, 5]}
        image={platform.image}
      />
      <PageBody id="platform">
        <InpageNav
          shortname={platform.shortname}
          items={Object.entries(sections).map(([id, section]) => ({
            id,
            label: section.nav,
          }))}
          path={path}
        />
        {Object.entries(sections).map(([id, section]) => (
          <section.component key={id} id={id} {...section.props} />
        ))}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    platform: platform(id: { eq: $slug }) {
      ...platformHeroFields
      ...platformOverviewFields
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
      campaigns {
        id
        shortname: short_name
        longname: long_name
        dois {
          id
        }
        instruments {
          id
          shortname: short_name
          longname: long_name
          description
          gcmdPhenomenas: gcmd_phenomenas {
            term
            topic
            variable_1
            variable_2
            variable_3
          }
          image {
            description
            gatsbyImg {
              childImageSharp {
                gatsbyImageData(
                  height: 100
                  layout: FIXED
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
      instruments {
        id
        shortname: short_name
        longname: long_name
        dois {
          id
        }
      }
    }
  }
`

PlatformTemplate.propTypes = {
  data: PropTypes.shape({
    platform: PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      description: PropTypes.string,
      onlineInformation: PropTypes.string,
      dois: PropTypes.arrayOf(
        PropTypes.shape({
          cmrTitle: PropTypes.string.isRequired,
          doi: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
      campaigns: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          dois: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
            }).isRequired
          ),
          instruments: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              shortname: PropTypes.string.isRequired,
              longname: PropTypes.string.isRequired,
              description: PropTypes.string.isRequired,
              gcmdPhenomenas: PropTypes.arrayOf(
                PropTypes.shape({
                  term: PropTypes.string.isRequired,
                  topic: PropTypes.string.isRequired,
                  variable_1: PropTypes.string.isRequired,
                  variable_2: PropTypes.string.isRequired,
                  variable_3: PropTypes.string.isRequired,
                })
              ),
              image: PropTypes.shape({
                gatsbyImg: PropTypes.shape({
                  childImageSharp: PropTypes.object.isRequired,
                }),
              }),
            })
          ).isRequired,
        })
      ),
      instruments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          dois: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
            }).isRequired
          ),
        })
      ),
      collectionPeriods: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.shape({
        description: PropTypes.string.isRequired,
        gatsbyImg: PropTypes.shape({
          description: PropTypes.string,
          childImageSharp: PropTypes.object.isRequired,
        }).isRequired,
      }),
    }),
  }),
  path: PropTypes.string.isRequired,
}
