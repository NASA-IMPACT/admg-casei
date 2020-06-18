import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import SectionBlock from "../../components/section/section-block"
import ContentGroup from "../../components/section/content-group"
import PlaceholderLogo from "../../images/placeholder-logo.svg"

const ProgramInfoSection = ({
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
          shortname: short_name
          longname: long_name
        }
      }
    }
  `)
  const partnerOrg = data.allPartnerOrg.nodes
    .filter(x => partnerOrgIds.includes(x.id))
    .map(x => x.shortname)
    .join(", ")

  return (
    <SectionBlock
      sectionTitle="Program Info"
      id="program-info"
      dataCy="program-info-section"
    >
      <div
        style={{
          flex: `0.618`,
          display: `flex`,
          justifyContent: `center`,
          alignItems: `center`,
          padding: `1rem`,
        }}
      >
        <img
          src={logo || PlaceholderLogo}
          alt="campaign-logo"
          data-cy="campaign-logo"
        />
      </div>
      <ContentGroup
        dataCy="program-info-content"
        contentItems={[
          { label: "Funding Agency", info: fundingAgency },
          { label: "Funding Program", info: fundingProgram },
          { label: "Funding Program Lead", info: programLead },
          { label: "Lead Investigator", info: leadInvestigator },
          { label: "Data Manager / Technical Contact", info: dataManager },
          { label: "Assigned Archive Repository", info: archive, type: "link" },
          { label: "Partner Organisation", info: partnerOrg },
          { label: "Tertiary Website", info: tertiaryWebsite, type: "link" },
        ]}
      />
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

ProgramInfoSection.propTypes = {
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

export default ProgramInfoSection
