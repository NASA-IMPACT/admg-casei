import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const OverviewSection = ({
  description,
  startdate,
  enddate,
  region,
  seasonIds,
  bounds,
  website,
}) => {
  const data = useStaticQuery(graphql`
    query {
      allSeason {
        nodes {
          id
          shortname: short_name
          longname: long_name
        }
      }
    }
  `)
  const season = data.allSeason.nodes
    .filter(x => seasonIds.includes(x.id))
    .map(x => x.shortname)
    .join(", ")

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

  const ListLink = props => (
    <li style={{ padding: `1rem`, borderBottom: `1px solid` }}>
      <a href={props.to}>{props.children}</a>
    </li>
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
            <FactItem label="Study dates" fact={`${startdate} – ${enddate}`} />
            <FactItem label="Region" fact={region} />
            <FactItem label="Season of Study" fact={season} />
            <FactItem label="Spatial bounds" fact={bounds} />
          </div>
        </div>
        <div
          style={{
            flex: `1`,
            marginLeft: `2rem`,
            padding: `1rem`,
            backgroundColor: `#FBFBFB`,
          }}
        >
          <label
            style={{
              textTransform: `uppercase`,
              color: `#6B6B6B`,
            }}
          >
            Relevant Links
          </label>
          <ul style={{ margin: 0, listStyle: `none` }} data-cy="link-list">
            <ListLink to={website}>Primary website</ListLink>
            <ListLink to={website}>Secondary website</ListLink>
            <ListLink to={website}>Tertiary website</ListLink>
            <ListLink to={website}>Data Products</ListLink>
            <ListLink to={website}>Campaign Publications</ListLink>
          </ul>
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
    website: project_website
  }
`
