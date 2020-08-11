import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import PlatformHeader from "./hero"
import Overview from "./overview"
import RelatedCampaigns from "./related-campaigns"

export default function PlatformTemplate({ data: { platform } }) {
  return (
    <Layout>
      <PlatformHeader
        shortname={platform.shortname}
        longname={platform.longname}
        campaigns={platform.campaigns.length}
        collectionPeriods={platform.collectionPeriods.length}
        textToImageRatio={[3, 5]}
      />
      <PageBody id="platform">
        <Overview
          description={platform.description}
          shortname={platform.shortname}
        />
        <RelatedCampaigns campaigns={platform.campaigns} />
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    platform: platform(id: { eq: $slug }) {
      ...platformHeroFields
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
          startdate: PropTypes.string.isRequired,
          enddate: PropTypes.string,
          region: PropTypes.string.isRequired,
          countCollectionPeriods: PropTypes.number,
          countDataProducts: PropTypes.number,
        })
      ),
      collectionPeriods: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
}
