import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import CampaignSection from "../../components/campaign-section"

const InfoItem = ({ label, info }) => (
  <div data-cy="info-item">
    <label
      style={{
        textTransform: `uppercase`,
        color: `#6B6B6B`,
      }}
    >
      {label}
    </label>
    <hr />
    <p>{info}</p>
  </div>
)

InfoItem.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}

const FundingSection = ({
  logo,
  fundingAgency,
  fundingProgram,
  programLead,
  leadInvestigator,
  dataManager,
  archive,
  partnerOrgIds,
  tertiaryWebsite,
}) => {
  const data = useStaticQuery(graphql`
    query {
      allPartnerOrg {
        nodes {
          id
          website
          short_name
          long_name
        }
      }
    }
  `)
  const partnerOrg = data.allPartnerOrg.nodes
    .filter(x => partnerOrgIds.includes(x.id))
    .map(x => x.shortname)
    .join(", ")

  return (
    <CampaignSection
      sectionTitle="Funding"
      id="funding"
      dataCy="funding-section"
    >
      <div
        style={{
          flex: `0.618`,
          padding: `2rem`,
        }}
      >
        <img src={logo} alt="campaign-logo" data-cy="campaign-logo" />
      </div>

      <div
        style={{
          flex: `2.618`,
          display: `grid`,
          gap: `0.5rem`,
          gridTemplateColumns: ` 1fr 1fr 1fr`,
          padding: `2rem`,
        }}
      >
        <InfoItem label="Funding Agency" info={fundingAgency} />
        <InfoItem label="Funding Program" info={fundingProgram} />
        <InfoItem label="Funding Program Lead" info={programLead} />
        <InfoItem label="Lead Investigator" info={leadInvestigator} />
        <InfoItem label="Data Manager / Technical Contact" info={dataManager} />
        <InfoItem label="Assigned Archive Repository" info={archive} />
        <InfoItem label="Partner Organisation" info={partnerOrg} />
        <InfoItem label="Tertiary Website" info={tertiaryWebsite} />
      </div>
    </CampaignSection>
  )
}

export const fundingFields = graphql`
  fragment fundingFields on campaign {
    # logo: Campaign_Logo___Image_Location__URL_

    fundingAgency: funding_agency
    fundingProgram: funding_program
    # supportedMission: Supported_NASA_Mission_s_

    programLead: funding_program_lead
    leadInvestigator: lead_investigator
    dataManager: technical_contact

    archive: repository_website
    partnerOrg: partner_orgs
    tertiaryWebsite: tertiary_website
  }
`

FundingSection.propTypes = {
  logo: PropTypes.string,
  fundingAgency: PropTypes.string.isRequired,
  fundingProgram: PropTypes.string.isRequired,
  programLead: PropTypes.string.isRequired,
  leadInvestigator: PropTypes.string.isRequired,
  dataManager: PropTypes.string.isRequired,
  archive: PropTypes.string.isRequired,
  partnerOrgIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  tertiaryWebsite: PropTypes.string.isRequired,
}

export default FundingSection
