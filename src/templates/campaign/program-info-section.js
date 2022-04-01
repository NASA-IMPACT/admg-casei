import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import {
  Section,
  SectionHeader,
  SectionContent,
  ContentItem,
  ContentGroup,
} from "../../components/layout"
import { CampaignIcon } from "../../icons"

const ProgramInfoSection = ({
  id,
  logoFullWidth,
  fundingAgency,
  fundingProgram,
  programLead,
  leadInvestigator,
  dataManager,
  partnerOrgListing,
  websites,
}) => {
  const repositoryWebsite = websites?.find(
    x => x.type.name === "Repository Website"
  )
  const publicationLink = websites?.find(
    x => x.type.name === "Overview Publication"
  )

  const contentList = [
    { label: "Funding Agency", info: fundingAgency },
    { label: "Funding Program", info: fundingProgram },
    { label: "Funding Program Lead", info: programLead },
    { label: "Principal Investigator(s)", info: leadInvestigator },
    { label: "Data Manager / Technical Contact", info: dataManager },
    {
      label: "NASA Data Repository",
      info: repositoryWebsite?.url,
      link: repositoryWebsite?.url,
    },
    { label: "Partner Organizations", info: partnerOrgListing },
    {
      label: "Overview Publication",
      info: publicationLink?.url,
      link: publicationLink?.url,
    },
  ]

  return (
    <Section id={id}>
      <SectionHeader headline="Program Info" id={id} />
      <SectionContent withBackground>
        <div
          css={`
            display: flex;
          `}
        >
          <div
            css={`
              flex: 0.618;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 1rem;
            `}
          >
            {logoFullWidth && logoFullWidth.gatsbyImg ? (
              <div
                css={`
                  width: 100%
                    /* gatsby-image wants width, for it to be visible */;
                `}
                data-cy="campaign-logo"
              >
                <GatsbyImage
                  image={
                    logoFullWidth.gatsbyImg.childImageSharp.gatsbyImageData
                  }
                  alt={logoFullWidth.description}
                />
              </div>
            ) : (
              <CampaignIcon />
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
    logoFullWidth: logo {
      description
      gatsbyImg {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
    fundingAgency: funding_agency
    fundingProgram: funding_program

    programLead: funding_program_lead
    leadInvestigator: lead_investigator
    dataManager: technical_contact

    partnerOrgs: partner_orgs {
      shortname: short_name
    }
  }
`

ProgramInfoSection.propTypes = {
  id: PropTypes.string.isRequired,
  logoFullWidth: PropTypes.shape({
    description: PropTypes.string.isRequired,
    gatsbyImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }),
  fundingAgency: PropTypes.string.isRequired,
  fundingProgram: PropTypes.string.isRequired,
  programLead: PropTypes.string.isRequired,
  leadInvestigator: PropTypes.string.isRequired,
  dataManager: PropTypes.string.isRequired,
  partnerOrgListing: PropTypes.string.isRequired,
  websites: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    })
  ),
}

export default ProgramInfoSection
