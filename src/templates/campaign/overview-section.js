import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { SectionBlock, ContentItem } from "../../components/section"
import ExternalLink from "../../components/external-link"
import theme from "../../utils/theme"
import { isUrl, PropTypeIsUrl } from "../../utils/helpers"

const ListLink = props => (
  <li
    style={{ padding: `1rem`, borderBottom: `1px solid ${theme.color.gray}` }}
  >
    {isUrl(props.to) ? (
      <ExternalLink label={props.children} url={props.to} id={props.children} />
    ) : (
      <p className="placeholder">{props.children}</p> // fallback for invalid url
    )}
  </li>
)

ListLink.propTypes = {
  to: PropTypeIsUrl,
  children: PropTypes.string.isRequired,
}

const OverviewSection = ({
  description,
  startdate,
  enddate,
  region,
  seasonListing,
  bounds,
  projectWebsite,
  repositoryWebsite,
  tertiaryWebsite,
  publicationLink,
}) => (
  <SectionBlock headline="Overview" id="overview">
    <div
      style={{
        display: `grid`,
        gap: `1rem`,
        gridTemplateColumns: `repeat(12, 1fr)`,
      }}
    >
      <div style={{ gridColumn: `1 / span 8` }}>
        <p data-cy="description">{description}</p>
        <div
          style={{
            display: `grid`,
            gap: `2rem`,
            gridAutoFlow: `column`,
            gridTemplateColumns: `1fr 1fr`,
            gridTemplateRows: ` 1fr 1fr`,
          }}
        >
          <ContentItem
            id="overview-content"
            label="Study dates"
            info={`${startdate} — ${enddate || "ongoing"}`}
          />
          <ContentItem id="overview-content" label="Region" info={region} />
          <ContentItem
            id="overview-content"
            label="Season of Study"
            info={seasonListing}
          />
          <ContentItem
            id="overview-content"
            label="Spatial bounds (WKT)"
            info={bounds}
          />
        </div>
      </div>
      <div
        style={{
          gridColumn: `10 / span 3`,
        }}
        data-cy="link-list"
      >
        <ul style={{ margin: 0, listStyle: `none` }}>
          {projectWebsite && (
            <ListLink to={projectWebsite}>Project website</ListLink>
          )}
          {repositoryWebsite && (
            <ListLink to={repositoryWebsite}>Repository website</ListLink>
          )}
          {tertiaryWebsite && (
            <ListLink to={tertiaryWebsite}>Tertiary website</ListLink>
          )}
          {publicationLink && (
            <ListLink to={publicationLink}>Publication links</ListLink>
          )}
        </ul>
      </div>
    </div>
  </SectionBlock>
)

export const overviewFields = graphql`
  fragment overviewFields on campaign {
    description: description_long
    startdate: start_date
    enddate: end_date
    region: region_description
    seasons {
      id
      shortname: short_name
      longname: long_name
    }
    bounds: spatial_bounds
    projectWebsite: project_website
    repositoryWebsite: repository_website
    tertiaryWebsite: tertiary_website
    publicationLink: publication_links
  }
`

OverviewSection.propTypes = {
  description: PropTypes.string.isRequired,
  startdate: PropTypes.string.isRequired,
  enddate: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  seasonListing: PropTypes.string.isRequired,
  bounds: PropTypes.string.isRequired,
  projectWebsite: PropTypes.string.isRequired,
  repositoryWebsite: PropTypes.string.isRequired,
  tertiaryWebsite: PropTypes.string.isRequired,
  publicationLink: PropTypes.string.isRequired,
}

export default OverviewSection
