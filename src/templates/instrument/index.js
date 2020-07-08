import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import Detail from "./detail"

const InstrumentTemplate = ({ data: { instrument } }) => {
  return (
    <Layout>
      <Header
        shortname={instrument.shortname}
        longname={instrument.longname}
        description={instrument.description}
      />
      <Detail
        id={instrument.id}
        radiometricFrequency={instrument.radiometricFrequency}
        temporalResolution={instrument.temporalResolution}
        spatialResolution={instrument.spatialResolution}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    instrument: instrument(id: { eq: $slug }) {
      ...instrumentHeaderFields
      ...instrumentDetailFields
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
      radiometricFrequency: PropTypes.string.isRequired,
      temporalResolution: PropTypes.string.isRequired,
      spatialResolution: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default InstrumentTemplate
