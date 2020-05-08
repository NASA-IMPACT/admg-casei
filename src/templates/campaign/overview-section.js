import React from "react"
import { graphql } from "gatsby"

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

export default OverviewSection

export const overviewFields = graphql`
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
`
