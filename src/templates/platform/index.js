import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import PlatformHeader from "./hero"
import Overview from "./overview"
import RelatedCampaigns from "./related-campaigns"
import { getOriginalImgName } from "../../utils/helpers"

export default function PlatformTemplate({
  data: { platform, allNasaImagesJson },
}) {
  const platformImage = allNasaImagesJson.nodes.find(
    img => img.shortname === platform.shortname
  )

  return (
    <Layout>
      <PlatformHeader
        shortname={platform.shortname}
        longname={platform.longname}
        campaigns={platform.campaigns.length}
        collectionPeriods={platform.collectionPeriods.length}
        textToImageRatio={[3, 5]}
        imgName={getOriginalImgName(platformImage.nasaImgUrl)}
        imgAlt={platformImage.nasaImgAlt}
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
    allNasaImagesJson(filter: { category: { eq: "platform" } }) {
      nodes {
        shortname
        nasaImgUrl
        nasaImgAlt
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
    allNasaImagesJson: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          nasaImgUrl: PropTypes.string.isRequired,
          nasaImgAlt: PropTypes.string.isRequired,
        }).isRequired
      ),
    }).isRequired,
  }),
}
