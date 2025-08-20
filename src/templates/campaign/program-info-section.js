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
import { breakpoints } from "../../theme"

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
  repositories,
}) => {
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
      info: repositories
        ? repositories[0]?.url.startsWith("http")
          ? repositories[0]?.shortname
          : repositories[0]?.longname
        : null,
      link:
        repositories && repositories[0]?.url.startsWith("http")
          ? repositories[0]?.url
          : null,
    },
    { label: "Partner Organizations", info: partnerOrgListing },
    {
      label: "Overview Publication",
      info: publicationLink?.url,
      link: publicationLink?.url,
    },
  ]
  console.log(repositories)

  return (
    <Section id={id}>
      <SectionHeader headline="Program Info" id={id} />
      <SectionContent withBackground>
        <div
          css={`
            display: flex;
            flex-direction: column;
            @media screen and (min-width: ${breakpoints["sm"]}) {
              flex-direction: row;
            }
          `}
        >
          <div
            css={`
              flex: 0.618;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 1rem;
              @media screen and (min-width: ${breakpoints["sm"]}) {
                flex-direction: row;
              }
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
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default ProgramInfoSection
