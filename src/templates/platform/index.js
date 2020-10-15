import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, { PageBody } from "../../components/layout"
import PlatformHero from "./hero"
import InpageNav from "../../components/inpage-nav"
import Overview from "./overview"
import RelatedCampaigns from "./related-campaigns"

export default function PlatformTemplate({ data: { platform }, path }) {
  const sections = {
    overview: {
      nav: "Overview",
      component: Overview,
      props: {
        description: platform.description,
        shortname: platform.shortname,
      },
    },
    "related-campaigns": {
      nav: "Related Campaigns",
      component: RelatedCampaigns,
      props: {
        campaigns: platform.campaigns,
      },
    },
  }

  return (
    <Layout>
      <PlatformHero
        shortname={platform.shortname}
        longname={platform.longname}
        campaigns={platform.campaigns.length}
        collectionPeriods={platform.collectionPeriods.length}
        textToImageRatio={[3, 5]}
        image={platform.image}
      />
      <InpageNav
        shortname={platform.shortname}
        items={Object.entries(sections).map(([id, section]) => ({
          id,
          label: section.nav,
        }))}
        path={path}
      />
      <PageBody id="platform">
        {Object.entries(sections).map(([id, section]) => (
          <section.component key={id} id={id} {...section.props} />
        ))}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    platform: platform(id: { eq: $slug }) {
      ...platformHeroFields
      ...platformOverviewFields
      campaigns {
        id
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
          id: PropTypes.string.isRequired,
        })
      ),
      collectionPeriods: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.shape({
        description: PropTypes.string.isRequired,
        gatsbyImg: PropTypes.shape({
          childImageSharp: PropTypes.object.isRequired,
        }).isRequired,
      }).isRequired,
    }),
  }),
  path: PropTypes.string.isRequired,
}
