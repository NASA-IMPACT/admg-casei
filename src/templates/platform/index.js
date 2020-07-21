import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import Overview from "./overview"
import RelatedCampaigns from "./related-campaigns"

export default function PlatformTemplate({ data: { platform } }) {
  return (
    <Layout>
      <Header
        shortname={platform.shortname}
        longname={platform.longname}
        campaigns={platform.campaigns.length}
        collectionPeriods={platform.collectionPeriods.length}
        textToImageRatio={[3, 5]}
      />
      <Overview
        description={platform.description}
        shortname={platform.shortname}
      />
      <RelatedCampaigns campaigns={platform.campaigns} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    platform: platform(id: { eq: $slug }) {
      ...platformHeaderFields
      ...platformOverviewFields
      ...platformCampaignFields
    }
  }
`

PlatformTemplate.propTypes = {
  data: PropTypes.shape({
    platform: PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      description: PropTypes.string,
      campaigns: PropTypes.arrayOf(
        PropTypes.shape({
          ongoing: PropTypes.bool,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string,
          id: PropTypes.string.isRequired,
          seasons: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
            })
          ).isRequired,
          focus: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
            })
          ).isRequired,
          startdate: PropTypes.string.isRequired,
          enddate: PropTypes.string,
          region: PropTypes.string.isRequired,
          deploymentIds: PropTypes.arrayOf(PropTypes.string),
          countCollectionPeriods: PropTypes.number,
          countDataProducts: PropTypes.number,
        })
      ),
      collectionPeriods: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
}
