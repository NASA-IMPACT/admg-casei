import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import InstrumentHero from "./hero"
import InpageNav from "../../components/inpage-nav"
import About from "./about"
import Entities from "./entities"

const InstrumentTemplate = ({ data: { instrument }, path }) => {
  const sections = {
    about: {
      nav: "Instrument Details",
      component: About,
      props: {
        instrumentTypes: instrument.instrumentTypes,
        radiometricFrequency: instrument.radiometricFrequency,
        temporalResolution: instrument.temporalResolution,
        spatialResolution: instrument.spatialResolution,
        calibration: instrument.calibration,
        measurementRegions: instrument.measurementRegions,
        gcmdPhenomenas: instrument.gcmdPhenomenas,
        instrumentDoi: instrument.instrumentDoi,
        instrumentManufacturer: instrument.instrumentManufacturer,
        fundingSource: instrument.fundingSource,
        leadInvestigator: instrument.leadInvestigator,
        technicalContact: instrument.technicalContact,
        onlineInformation: instrument.onlineInformation,
        overviewPublication: instrument.overviewPublication,
        repositories: instrument.repositories,
      },
    },
    entities: {
      nav: "Instrument Operation",
      component: Entities,
      props: {
        platforms: instrument.platforms,
        campaigns: instrument.campaigns,
      },
    },
  }
  return (
    <Layout>
      <InstrumentHero
        shortname={instrument.shortname}
        longname={instrument.longname}
        description={instrument.description}
      />
      <InpageNav
        shortname={instrument.shortname}
        items={Object.entries(sections).map(([id, section]) => ({
          id,
          label: section.nav,
        }))}
        path={path}
      />
      <PageBody id="instrument">
        {Object.entries(sections).map(([id, section]) => (
          <section.component key={id} id={id} {...section.props} />
        ))}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    instrument: instrument(id: { eq: $slug }) {
      ...instrumentHeroFields
      ...instrumentDetailFields
      ...instrumentEntitiesFields
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

      collectionPeriods: PropTypes.arrayOf(PropTypes.string),
      instrumentTypes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
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
      gcmdPhenomenas: PropTypes.arrayOf(
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
