import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
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
    { label: "Partner Organization", info: partnerOrgListing },
    { label: "Tertiary Website", info: tertiaryWebsite, link: tertiaryWebsite },
  ]

  return (
    <SectionBlock id="program-info">
      <SectionHeader headline="Program Info" to="#program-info" />
      <SectionContent withBackground>
        <div style={{ display: `flex` }}>
          <div
            style={{
              flex: `0.618`,
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
              padding: `1rem`,
            }}
          >
            {logo.nasaImg ? (
              <div
                style={{
                  width: `100%` /* gatsby-image wants width, for it to be visible */,
                }}
                data-cy="campaign-logo"
              >
                <Image
                  alt={logo.nasaImgAlt}
                  fluid={logo.nasaImg.childImageSharp.fluid}
                />
              </div>
            ) : (
              <img
                src={PlaceholderLogo}
                alt="placeholder-logo"
                data-cy="campaign-logo"
              />
            )}
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
        </div>
      </SectionContent>
    </SectionBlock>
  )
}

export const fundingFields = graphql`
  fragment fundingFields on campaign {
    logo {
      nasaImgAlt
      nasaImgUrl
      nasaImg {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

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
  logo: PropTypes.shape({
    nasaImgAlt: PropTypes.string.isRequired,
    nasaImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }).isRequired,
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
