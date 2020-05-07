import React from "react"
import { graphql } from "gatsby"

import ExploreCard from "../components/explore-card"
import Layout from "../components/layout"
import NorthAmerica from "../data/north-america.svg"

const Header = ({
  shortname,
  longname,
  focus,
  countDeployments,
  countDataproducts,
}) => {
  const StatNumber = ({ number = "--", label }) => (
    <>
      <dt style={{ fontSize: `3rem` }}>
        {number.length === 0 ? "--" : number}
      </dt>
      <dd style={{ gridRowStart: 2, textTransform: `uppercase` }}>{label}</dd>
    </>
  )

  return (
    <header style={{ display: `flex` }}>
      <div style={{ flex: `1.61803398875` }}>
        <div>
          <p>{shortname}</p>
          <h1>{longname}</h1>
          <p>{focus}</p>
        </div>
        <dl style={{ display: `grid` }} data-cy="stats">
          <StatNumber number={countDeployments} label="Deployments" />
          <StatNumber number="--" label="Flights" />
          <StatNumber number={countDataproducts} label="Data Products" />
        </dl>
      </div>
      <div style={{ flex: `1` }}>
        <img src={NorthAmerica} alt="North America" data-cy="overview-map" />
      </div>
    </header>
  )
}

const InpageNav = ({ website }) => {
  const InpageLink = props => (
    <li style={{ margin: `0 1rem 0 0` }}>
      <a href={props.to}>{props.children}</a>
    </li>
  )

  return (
    <div
      style={{
        position: `sticky`,
        top: `0`,
        backgroundColor: `#FEFEFE`,
        display: `flex`,
        padding: `1rem`,
        borderTop: `1px solid #9E9E9E`,
        borderBottom: `1px solid #9E9E9E`,
        justifyContent: `space-between`,
        alignItems: `center`,
        zIndex: 99,
      }}
    >
      <nav role="inpage-scroll">
        <ul
          style={{
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `flex-start`,
            margin: 0,
            listStyle: `none`,
          }}
        >
          <InpageLink to="#overview">Overview</InpageLink>
          <InpageLink to="#milestones">Milestones</InpageLink>
          <InpageLink to="#platforms">Platforms & Instruments</InpageLink>
          <InpageLink to="#data">Data</InpageLink>
          <InpageLink to="#resources">Resources</InpageLink>
        </ul>
      </nav>
      <div style={{ display: `flex` }}>
        <div style={{ padding: `0 1rem`, borderLeft: `1px solid #9E9E9E` }}>
          <a href={website}>Primary Website</a>
        </div>
        <div style={{ padding: `0 1rem`, borderLeft: `1px solid #9E9E9E` }}>
          <a href={website}>Data</a>
        </div>
      </div>
    </div>
  )
}

const OverviewSection = ({
  description,
  startdate,
  enddate,
  region,
  season,
  bounds,
  focusPenomena,
  keywords,
}) => {
  const FactItem = ({ label, fact }) => (
    <div data-cy="overview-fact">
      <label
        style={{
          textTransform: `uppercase`,
          color: `#9E9E9E`,
        }}
      >
        {label}
      </label>
      <p style={{ margin: 0 }}>{fact}</p>
    </div>
  )

  const WordList = ({ label, list }) => (
    <>
      <label style={{ textTransform: `uppercase`, color: `#9E9E9E` }}>
        {label}
      </label>
      <p>{list}</p>
    </>
  )

  return (
    <section id="overview" data-cy="overview-section">
      <h2>Overview</h2>
      <div style={{ display: `flex` }}>
        <div style={{ flex: `1.61803398875` }}>
          <p data-cy="description">{description}</p>
          <div
            style={{
              display: `grid`,
              gap: `0.5rem`,
              gridAutoFlow: `column`,
              gridTemplateColumns: ` 1fr 1fr`,
              gridTemplateRows: ` 1fr 1fr`,
            }}
          >
            <FactItem label="Study dates" fact={`${startdate} - ${enddate}`} />
            <FactItem label="Region" fact={region} />
            <FactItem label="Season of Study" fact={season} />
            <FactItem label="Spatial bounds" fact={bounds} />
          </div>
        </div>
        <div
          style={{ flex: `1`, padding: `1rem`, backgroundColor: `#FBFBFB` }}
          data-cy="word-list"
        >
          <WordList label="Focus Phenomena" list={focusPenomena} />
          <WordList label="Science Keywords" list={keywords} />
        </div>
      </div>
    </section>
  )
}

const PlatformsSection = ({ platforms }) => (
  <section id="platforms" data-cy="platforms-section">
    <h2>Platforms & Instruments</h2>
    <div
      style={{
        display: `grid`,
        gap: `0.5rem`,
        gridTemplateColumns: ` 1fr 1fr 1fr 1fr`,
      }}
    >
      {platforms.nodes.map(node => (
        <div key={node.shortname} data-cy="platform">
          <ExploreCard title={node.shortname} description={node.longname} />
        </div>
      ))}
    </div>
  </section>
)

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

const CampaignTemplate = ({ data: { campaign, platforms } }) => {
  return (
    <Layout>
      <Header
        shortname={campaign.shortname}
        longname={campaign.longname}
        focus={campaign.focus}
        countDeployments={campaign.countDeployments}
        countDataproducts={campaign.countDataproducts}
      />
      <InpageNav website={campaign.website} />
      <OverviewSection
        description={campaign.description}
        startdate={campaign.startdate}
        enddate={campaign.enddate}
        region={campaign.region}
        season={campaign.season}
        bounds={campaign.bounds}
        focusPenomena={campaign.focusPenomena}
        keywords={campaign.keywords}
      />
      <section id="milestones" data-cy="milestones-section">
        <h2>Milestones</h2>
      </section>
      <PlatformsSection platforms={platforms} />
      <section id="data" data-cy="data-section">
        <h2>Data</h2>
      </section>
      <ResourcesSection
        logo={campaign.logo}
        logoAlt={campaign.logoAlt}
        fundingAgency={campaign.fundingAgency}
        fundingProgram={campaign.fundingProgram}
        supportedMission={campaign.supportedMission}
        programLead={campaign.programLead}
        campaignLead={campaign.campaignLead}
        dataManager={campaign.dataManager}
        archive={campaign.archive}
        partnerOrg={campaign.partnerOrg}
        partnerWebsite={campaign.partnerWebsite}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $platforms: [String!]) {
    campaign: campaignCsv(id: { eq: $slug }) {
      ...headerFields
      website: Repository_Primary_Website__DAAC_homepage_
      ...overviewFields
      ...resourcesFields
    }
    platforms: allPlatformCsv(
      filter: { ADMG_s_Platform_Shortname: { in: $platforms } }
    ) {
      nodes {
        shortname: ADMG_s_Platform_Shortname
        longname: ADMG_s_Platform_Longname
      }
    }
  }

  fragment headerFields on CampaignCsv {
    shortname: Campaign_Shortname
    longname: Campaign_Longname
    focus: NASA_Earth_Science_Focus_Areas
    countDeployments: Number_of_Deployments
    countDataproducts: Number_of_Published_Data_Products
  }

  fragment overviewFields on CampaignCsv {
    description: Description___DRAFT
    startdate: Campaign_Start_Date__date_of_first_deployment_start_
    enddate: Campaign_End_Date__date_of_last_deployment_end_
    region: Region_of_Campaign_Description
    season: Season_s__of_Study
    bounds: Campaign_Spatial_Bounds__N_S_E_W_lat_lon_
    focusPenomena: Scientific_Objective_Focus_Phenomena
    keywords: Campaign_Geophysical_Phenomena_Studied__from_GCMD_variable_list_
  }

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

export default CampaignTemplate
