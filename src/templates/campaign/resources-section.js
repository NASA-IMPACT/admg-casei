import React from "react"
import { graphql } from "gatsby"

const ResourcesSection = ({
  logo,
  logoAlt,
  fundingAgency,
  fundingProgram,
  supportedMission,
  programLead,
  campaignLead,
  dataManager,
  archive,
  partnerOrg,
  partnerWebsite,
}) => {
  const InfoItem = ({ label, info }) => (
    <div data-cy="info-item">
      <label
        style={{
          textTransform: `uppercase`,
          color: `#9E9E9E`,
        }}
      >
        {label}
      </label>
      <hr />
      <p>{info}</p>
    </div>
  )

  return (
    <section id="resources" data-cy="resources-section">
      <h2>Additional Information</h2>
      <div style={{ display: `flex`, alignItems: `stretch` }}>
        <div
          style={{
            flex: `0.618`,
            backgroundColor: `#D8D8D8`,
            padding: `2rem`,
          }}
        >
          <img src={logo} alt={logoAlt} data-cy="campaign-logo" />
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
          <InfoItem label="Supported NASA Mission" info={supportedMission} />
          <InfoItem label="Funding Program Lead" info={programLead} />
          <InfoItem label="Campaign or Project Lead" info={campaignLead} />
          <InfoItem
            label="Data Manager / Technical Contact"
            info={dataManager}
          />
          <InfoItem label="Assigned Archive Repository" info={archive} />
          <InfoItem label="Partner Organisation" info={partnerOrg} />
          <InfoItem label="Partner Website" info={partnerWebsite} />
        </div>
      </div>
    </section>
  )
}

export default ResourcesSection

export const resourcesFields = graphql`
  fragment resourcesFields on CampaignCsv {
    logo: Campaign_Logo___Image_Location__URL_
    logoAlt: Campaign_Logo___Image_Name

    fundingAgency: Funding_Agency
    fundingProgram: NASA_Funding_Program
    supportedMission: Supported_NASA_Mission_s_

    programLead: Responsible_NASA_Funding_Program_Lead
    campaignLead: Responsible_NASA_Campaign_or_Project_Lead
    dataManager: Data_Manager__Technical_Contact__person_or_NID_

    archive: Assigned_Archive_Repository__DAAC_
    partnerOrg: Partner_Organizations
    partnerWebsite: Partner_Website_s_
  }
`
