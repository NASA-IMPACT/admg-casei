import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
  ContentItem,
} from "../../components/section"
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
  id,
  description,
  startdate,
  enddate,
  region,
  seasonListing,
  bounds,
  doi,
  projectWebsite,
  repositoryWebsite,
  tertiaryWebsite,
  publicationLink,
}) => (
  <SectionBlock id={id}>
    <SectionHeader headline="Overview" id={id} />
    <SectionContent columns={[1, 8]}>
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
    </SectionContent>
    <SectionContent columns={[10, 3]}>
      <ul style={{ margin: 0, listStyle: `none` }} data-cy="link-list">
        <li
          style={{
            padding: `1rem`,
            border: `1px solid ${theme.color.base}`,
          }}
        >
          {doi ? (
            <p
              style={{
                whiteSpace: `nowrap`,
                overflow: `hidden`,
                textOverflow: `ellipsis`,
              }}
            >
              DOI: <ExternalLink label={doi} url={doi} id="doi" />
            </p>
          ) : (
            <p data-cy="doi-link">no campaign DOI available</p>
          )}
        </li>
        {repositoryWebsite && (
          <ListLink to={repositoryWebsite}>Repository website</ListLink>
        )}
        {projectWebsite && (
          <ListLink to={projectWebsite}>Project website</ListLink>
        )}
        {tertiaryWebsite && (
          <ListLink to={tertiaryWebsite}>Tertiary website</ListLink>
        )}
        {publicationLink && (
          <ListLink to={publicationLink}>Overview Publication</ListLink>
        )}
      </ul>
    </SectionContent>
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
    doi
    projectWebsite: project_website
    repositoryWebsite: repository_website
    tertiaryWebsite: tertiary_website
    publicationLink: publication_links
  }
`

OverviewSection.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startdate: PropTypes.string.isRequired,
  enddate: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  seasonListing: PropTypes.string.isRequired,
  bounds: PropTypes.string.isRequired,
  doi: PropTypes.string,
  projectWebsite: PropTypes.string.isRequired,
  repositoryWebsite: PropTypes.string.isRequired,
  tertiaryWebsite: PropTypes.string.isRequired,
  publicationLink: PropTypes.string.isRequired,
}

export default OverviewSection
