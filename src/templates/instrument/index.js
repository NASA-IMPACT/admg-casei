import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import Entities from "./entities"
import Resources from "./resources"
import { About, Background } from "./detail"

const InstrumentTemplate = ({ data: { instrument, platforms, campaigns } }) => {
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
          <Entities platforms={platforms.nodes} campaigns={campaigns.edges} />
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
    platforms: allPlatform(filter: { instruments: { eq: $slug } }) {
      ...instrumentPlatformFields
    }
    campaigns: allCampaign(
      filter: {
        platforms: {
          elemMatch: { id: { eq: "d59b3d7e-f782-4e25-a8eb-ceec91c0331e" } }
        }
      }
    ) {
      edges {
        node {
          shortname: short_name
        }
      }
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
      instrumentManufacturer: PropTypes.string.isRequired,
      fundingSource: PropTypes.string.isRequired,
      onlineInformation: PropTypes.string.isRequired,
    }).isRequired,
    campaigns: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
    platforms: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
}

export default InstrumentTemplate
