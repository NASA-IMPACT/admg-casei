import React from "react"
import PropTypes from "prop-types"

import Layout from "../../../components/layout"
import HeaderForm from "./header-form"

export default function CampaignForm({ data: { campaign } }) {
  return (
    <Layout>
      <HeaderForm
        bounds={campaign.bounds}
        shortname={campaign.shortname}
        longname={campaign.longname}
        focusListing={campaign.focus.map(x => x.shortname).join(", ")}
        countDeployments={campaign.countDeployments}
        countCollectionPeriods={campaign.countCollectionPeriods}
        countDataProducts={campaign.countDataProducts}
      />
      {/* TODO: Add forms for the rest of the sections */}
    </Layout>
  )
}

CampaignForm.propTypes = {
  data: PropTypes.shape({
    campaign: PropTypes.shape({
      bounds: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      focus: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      geophysical: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      countDeployments: PropTypes.number,
      countCollectionPeriods: PropTypes.number.isRequired,
      countDataProducts: PropTypes.number,
      description: PropTypes.string.isRequired,
      startdate: PropTypes.string.isRequired,
      enddate: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      seasons: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      projectWebsite: PropTypes.string.isRequired,
      repositoryWebsite: PropTypes.string.isRequired,
      tertiaryWebsite: PropTypes.string.isRequired,
      publicationLink: PropTypes.string.isRequired,
      focusPhenomena: PropTypes.string.isRequired,
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ).isRequired,
      logo: PropTypes.string,
      fundingAgency: PropTypes.string.isRequired,
      fundingProgram: PropTypes.string.isRequired,
      programLead: PropTypes.string.isRequired,
      leadInvestigator: PropTypes.string.isRequired,
      dataManager: PropTypes.string.isRequired,
      archive: PropTypes.string.isRequired,
      partnerOrgs: PropTypes.arrayOf(
        PropTypes.shape({
          shortname: PropTypes.string.isRequired,
        })
      ).isRequired,
      partnerWebsite: PropTypes.string,
      uuid: PropTypes.string.isRequired,
    }).isRequired,
    deployments: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          flights: PropTypes.array.isRequired,
          region: PropTypes.array.isRequired,
          campaign: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
          start: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
  }).isRequired,
}
