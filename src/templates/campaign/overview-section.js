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
          color: `#6B6B6B`,
        }}
      >
        {label}
      </label>
      <p style={{ margin: 0 }}>{fact}</p>
    </div>
  )

  const WordList = ({ label, list }) => (
    <>
      <label style={{ textTransform: `uppercase`, color: `#6B6B6B` }}>
        {label}
      </label>
      <p>{list}</p>
    </>
  )

  return (
    <section className="inpage-nav" id="overview" data-cy="overview-section">
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
  fragment overviewFields on campaign {
    description: description_long
    startdate: start_date
    enddate: end_date
    region: region_description
    season: seasons
    bounds: spatial_bounds
    focusPenomena: focus_phenomena
    keywords: focus_areas
  }
`
