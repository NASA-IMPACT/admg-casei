import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import InstrumentHero from "./hero"
import InpageNav from "../../components/inpage-nav"
import About from "./about"
import Entities from "./entities"
import Resources from "./resources"

const InstrumentTemplate = ({ data: { instrument }, path }) => {
  const sections = {
    about: {
      nav: "About",
      component: About,
      props: {
        radiometricFrequency: instrument.radiometricFrequency,
        temporalResolution: instrument.temporalResolution,
        spatialResolution: instrument.spatialResolution,
        instrumentManufacturer: instrument.instrumentManufacturer,
        fundingSource: instrument.fundingSource,
        instrumentId: instrument.id,
      },
    },
    entities: {
      nav: "Related Entities",
      component: Entities,
      props: {
        platforms: instrument.platforms,
        campaignIds: instrument.campaignIds,
      },
    },
    resources: {
      nav: "Related Information",
      component: Resources,
      props: {
        onlineInformation: instrument.onlineInformation,
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
      ...instrumentResourcesFields
    }
  }
`
InstrumentTemplate.propTypes = {
  data: PropTypes.shape({
    instrument: PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      radiometricFrequency: PropTypes.string,
      temporalResolution: PropTypes.string,
      spatialResolution: PropTypes.string,
      instrumentManufacturer: PropTypes.string,
      fundingSource: PropTypes.string,
      onlineInformation: PropTypes.string,
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string,
          campaigns: PropTypes.arrayOf(
            PropTypes.shape({ shortname: PropTypes.string })
          ),
        })
      ),
      campaignIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
}

export default InstrumentTemplate
