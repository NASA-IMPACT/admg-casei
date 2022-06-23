import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import SEO from "../../components/seo"
import InstrumentHero from "./hero"
import InpageNav from "../../components/inpage-nav"
import OverviewSection from "./overview-section"
import Entities from "./entities"
import DataSection from "../../components/data-section"
import { parseTextToList } from "../../utils/helpers"

const InstrumentTemplate = ({ data: { instrument }, path }) => {
  const sections = {
    overview: {
      nav: "Instrument Details",
      component: OverviewSection,
      props: {
        measurementType: instrument.measurementType,
        radiometricFrequency: instrument.radiometricFrequency,
        temporalResolution: instrument.temporalResolution,
        spatialResolution: instrument.spatialResolution,
        calibration: instrument.calibration,
        measurementRegions: instrument.measurementRegions,
        gcmdPhenomena: instrument.gcmdPhenomena,
        instrumentDoi: instrument.instrumentDoi,
        instrumentManufacturer: instrument.instrumentManufacturer,
        fundingSource: instrument.fundingSource,
        leadInvestigator: instrument.leadInvestigator,
        technicalContact: instrument.technicalContact,
        onlineInformation: parseTextToList(instrument.onlineInformation),
        overviewPublication: instrument.overviewPublication,
        repositories: instrument.repositories,
      },
    },
    entities: {
      nav: "Instrument Operation",
      component: Entities,
      props: {
        collectionPeriods: instrument.collectionPeriods,
      },
    },
    data: {
      nav: "Data",
      component: DataSection,
      props: {
        dois: instrument.dois,
        filterBy: ["campaigns", "platforms"],
        category: "instrument",
      },
    },
  }
  return (
    <Layout>
      <SEO title={instrument.shortname} lang="en" />

      <InstrumentHero
        shortname={instrument.shortname}
        longname={instrument.longname}
        description={instrument.description}
        image={instrument.image}
      />
      <PageBody id="instrument">
        <InpageNav
          shortname={instrument.shortname}
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
  query ($slug: String!) {
    instrument: instrument(id: { eq: $slug }) {
      ...instrumentHeroFields
      ...instrumentDetailFields
      ...instrumentEntitiesFields
      collectionPeriods: collection_periods {
        id
        deployment: deployment {
          id
          campaign: campaign {
            id
            shortname: short_name
            longname: long_name
            dois {
              id
            }
          }
        }
        platform: platform {
          id
          shortname: short_name
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
    }
  }
`
InstrumentTemplate.propTypes = {
  data: PropTypes.shape({
    instrument: PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dois: PropTypes.arrayOf(
        PropTypes.shape({
          cmrTitle: PropTypes.string.isRequired,
          doi: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          longname: PropTypes.string,
        })
      ).isRequired,
      image: PropTypes.shape({
        description: PropTypes.string.isRequired,
        gatsbyImg: PropTypes.shape({
          childImageSharp: PropTypes.object.isRequired,
        }).isRequired,
      }),
      collectionPeriods: PropTypes.arrayOf(PropTypes.string),
      measurementType: PropTypes.shape({
        id: PropTypes.string.isRequired,
        longname: PropTypes.string.isRequired,
      }).isRequired,
      radiometricFrequency: PropTypes.string,
      temporalResolution: PropTypes.string,
      spatialResolution: PropTypes.string,
      calibration: PropTypes.string,
      measurementRegions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
      gcmdPhenomena: PropTypes.arrayOf(
        PropTypes.shape({
          term: PropTypes.string,
          topic: PropTypes.string,
          variable_1: PropTypes.string,
          variable_2: PropTypes.string,
          variable_3: PropTypes.string,
        }).isRequired
      ).isRequired,
      instrumentDoi: PropTypes.string,
      instrumentManufacturer: PropTypes.string,
      fundingSource: PropTypes.string,
      leadInvestigator: PropTypes.string,
      technicalContact: PropTypes.string,
      onlineInformation: PropTypes.string,
      overviewPublication: PropTypes.string,
      repositories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ),
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string,
          campaigns: PropTypes.arrayOf(
            PropTypes.shape({ shortname: PropTypes.string })
          ),
        })
      ),
      campaigns: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
}

export default InstrumentTemplate
