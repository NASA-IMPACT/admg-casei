import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import Entities from "./entities"
import Resources from "./resources"
import { About, Background } from "./detail"

const InstrumentTemplate = ({ data: { instrument } }) => {
  return (
    <Layout>
      <Header
        shortname={instrument.shortname}
        longname={instrument.longname}
        description={instrument.description}
      />
      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `5fr 3fr`,
          columnGap: `2rem`,
        }}
      >
        <div>
          <About
            id={instrument.id}
            radiometricFrequency={instrument.radiometricFrequency}
            temporalResolution={instrument.temporalResolution}
            spatialResolution={instrument.spatialResolution}
          />
          <Entities platforms={instrument.platforms} />
          <Resources onlineInformation={instrument.onlineInformation} />
        </div>
        <Background
          instrumentManufacturer={instrument.instrumentManufacturer}
          fundingSource={instrument.fundingSource}
        />
      </div>
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
