import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import {
  Section,
  SectionHeader,
  SectionContent,
  ContentItem,
  ContentGroup,
} from "../../components/layout"
import PlaceholderLogo from "../../images/placeholder-logo.svg"

const ProgramInfoSection = ({
  id,
  logo,
  fundingAgency,
  fundingProgram,
  programLead,
  leadInvestigator,
  dataManager,
  repositoryWebsite,
  partnerOrgListing,
  publicationLink,
}) => {
  const contentList = [
    { label: "Funding Agency", info: fundingAgency },
    { label: "Funding Program", info: fundingProgram },
    { label: "Funding Program Lead", info: programLead },
    { label: "Principle Investigator(s)", info: leadInvestigator },
    { label: "Data Manager / Technical Contact", info: dataManager },
    {
      label: "NASA Data Repository",
      info: repositoryWebsite,
      link: repositoryWebsite,
    },
    { label: "Partner Organizations", info: partnerOrgListing },
    {
      label: "Publication Overview",
      info: publicationLink,
      link: publicationLink,
    },
  ]

  return (
    <Section id={id}>
      <SectionHeader headline="Program Info" id={id} />
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
            {logo && logo.logoImg ? (
              <div
                style={{
                  width: `100%` /* gatsby-image wants width, for it to be visible */,
                }}
                data-cy="campaign-logo"
              >
                <Image
                  alt={logo.logoAlt}
                  fluid={logo.logoImg.childImageSharp.fluid}
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
                id={`${id}-content`}
                label={item.label}
                info={item.info}
                link={item.link}
              />
            ))}
          </ContentGroup>
        </div>
      </SectionContent>
    </Section>
  )
}

export const fundingFields = graphql`
  fragment fundingFields on campaign {
    logo {
      logoAlt
      logoImg {
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

    repositoryWebsite: repository_website
    partnerOrgs: partner_orgs {
      shortname: short_name
    }
    publicationLink: publication_links
  }
`

ProgramInfoSection.propTypes = {
  id: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    logoAlt: PropTypes.string.isRequired,
    logoImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }).isRequired,
  fundingAgency: PropTypes.string.isRequired,
  fundingProgram: PropTypes.string.isRequired,
  programLead: PropTypes.string.isRequired,
  leadInvestigator: PropTypes.string.isRequired,
  dataManager: PropTypes.string.isRequired,
  repositoryWebsite: PropTypes.string.isRequired,
  partnerOrgListing: PropTypes.string.isRequired,
  publicationLink: PropTypes.string.isRequired,
}

export default ProgramInfoSection
