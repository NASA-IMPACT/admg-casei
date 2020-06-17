import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SectionBlock from "../../components/section/section-block"
import ContentItem from "../../components/section/content-item"
import { LogoPlaceholder } from "../../components/icons/"

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
    .map(x => x.short_name)
    .join(", ")

  return (
    <SectionBlock sectionTitle="Funding" id="funding" dataCy="funding-section">
      <div
        style={{
          flex: `0.618`,
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
          padding: `1rem`,
        }}
      >
        {logo ? (
          <img src={logo} alt="campaign-logo" data-cy="campaign-logo" />
        ) : (
          <LogoPlaceholder />
        )}
      </div>

      <div
        style={{
          flex: `2.618`,
          display: `grid`,
          gap: `1.5rem`,
          gridTemplateColumns: `minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)`,
          padding: `2rem`,
        }}
      >
        <ContentItem label="Funding Agency" info={fundingAgency} />
        <ContentItem label="Funding Program" info={fundingProgram} />
        <ContentItem label="Funding Program Lead" info={programLead} />
        <ContentItem label="Lead Investigator" info={leadInvestigator} />
        <ContentItem
          label="Data Manager / Technical Contact"
          info={dataManager}
        />
        <ContentItem
          label="Assigned Archive Repository"
          info={archive}
          type="link"
        />
        <ContentItem label="Partner Organisation" info={partnerOrg} />
        <ContentItem
          label="Tertiary Website"
          info={tertiaryWebsite}
          type="link"
        />
      </div>
    </SectionBlock>
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
