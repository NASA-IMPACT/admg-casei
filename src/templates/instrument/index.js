import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { Main } from "../../components/layout"
import Header from "./header"
import About from "./about"
import Entities from "./entities"
import Resources from "./resources"

const InstrumentTemplate = ({ data: { instrument } }) => {
  return (
    <Layout>
      <Header
        shortname={instrument.shortname}
        longname={instrument.longname}
        description={instrument.description}
      />
      <Main>
        <About
          id={instrument.id}
          radiometricFrequency={instrument.radiometricFrequency}
          temporalResolution={instrument.temporalResolution}
          spatialResolution={instrument.spatialResolution}
          instrumentManufacturer={instrument.instrumentManufacturer}
          fundingSource={instrument.fundingSource}
        />
        <Entities platforms={instrument.platforms} />
        <Resources onlineInformation={instrument.onlineInformation} />
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    instrument: instrument(id: { eq: $slug }) {
      ...instrumentHeaderFields
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
    }).isRequired,
  }).isRequired,
}

export default InstrumentTemplate
