import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ResourcesSection = ({
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

  return (
    <section className="inpage-nav" id="resources" data-cy="resources-section">
      <h2>Additional Information</h2>
      <div style={{ display: `flex`, alignItems: `stretch` }}>
        <div
          style={{
            flex: `0.618`,
            backgroundColor: `#D8D8D8`,
            padding: `2rem`,
          }}
        >
          <img src={logo} alt="campaign-logo" data-cy="campaign-logo" />
        </div>

        <div
          style={{
            flex: `2.618`,
            backgroundColor: `#FBFBFB`,
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
          <InfoItem
            label="Data Manager / Technical Contact"
            info={dataManager}
          />
          <InfoItem label="Assigned Archive Repository" info={archive} />
          <InfoItem label="Partner Organisation" info={partnerOrg} />
          <InfoItem label="Tertiary Website" info={tertiaryWebsite} />
        </div>
      </div>
    </section>
  )
}

export default ResourcesSection

export const resourcesFields = graphql`
  fragment resourcesFields on campaign {
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
