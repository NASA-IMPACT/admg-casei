import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import {
  SectionBlock,
  ContentItem,
  ContentGroup,
} from "../../components/section"
import PlaceholderLogo from "../../images/placeholder-logo.svg"

const ProgramInfoSection = ({
  logo,
  fundingAgency,
  fundingProgram,
  programLead,
  leadInvestigator,
  dataManager,
  archive,
  partnerOrgListing,
  tertiaryWebsite,
}) => {
  const contentList = [
    { label: "Funding Agency", info: fundingAgency },
    { label: "Funding Program", info: fundingProgram },
    { label: "Funding Program Lead", info: programLead },
    { label: "Lead Investigator", info: leadInvestigator },
    { label: "Data Manager / Technical Contact", info: dataManager },
    { label: "Assigned Archive Repository", info: archive, link: archive },
    { label: "Partner Organisation", info: partnerOrgListing },
    { label: "Tertiary Website", info: tertiaryWebsite, link: tertiaryWebsite },
  ]

  return (
    <SectionBlock headline="Program Info" id="program-info" withBackground>
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

      <ContentGroup>
        {contentList.map(item => (
          <ContentItem
            key={item.label}
            id="program-info-content"
            label={item.label}
            info={item.info}
            link={item.link}
          />
        ))}
      </ContentGroup>
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
    partnerOrgs: partner_orgs {
      shortname: short_name
    }
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
  partnerOrgListing: PropTypes.string.isRequired,
  tertiaryWebsite: PropTypes.string.isRequired,
}

export default ProgramInfoSection
