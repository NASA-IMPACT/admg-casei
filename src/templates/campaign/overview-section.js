import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import VisuallyHidden from "@reach/visually-hidden"

import {
  Section,
  SectionHeader,
  SectionContent,
  ContentItem,
} from "../../components/layout"
import ExternalLink from "../../components/external-link"
import theme from "../../utils/theme"
import { isUrl, PropTypeIsUrl } from "../../utils/helpers"

const ListLink = props => (
  <li
    style={{
      padding: props.noPadding ? 0 : `1rem`,
      borderBottom: props.noBorder ? `none` : `1px solid ${theme.color.gray}`,
    }}
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
  noPadding: PropTypes.bool,
  noBorder: PropTypes.bool,
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
  notesPublic,
  repositories,
}) => (
  <Section id={id} isLight>
    <VisuallyHidden>
      <SectionHeader headline="Overview" id={id} />
    </VisuallyHidden>
    <SectionContent columns={[1, 8]}>
      <h3>The Campaign</h3>
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
            border: `1px solid ${theme.color.text}`,
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
              Campaign DOI: <ExternalLink label={doi} url={doi} id="doi" />
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

    <SectionContent columns={[1, 8]}>
      <h3>Additional Notes</h3>
      <p data-cy="notes-public">{notesPublic}</p>
    </SectionContent>
    <SectionContent columns={[1, 8]}>
      <h3>Repositories</h3>
      <ul style={{ margin: 0, listStyle: `none` }} data-cy="repo-list">
        {repositories.map(repo => (
          <ListLink key={repo.id} to={repo.shortname} noBorder noPadding>
            {repo.longname}
          </ListLink>
        ))}
      </ul>
    </SectionContent>
  </Section>
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
    notesPublic: notes_public
    repositories: repositories {
      id
      shortname: short_name
      longname: long_name
    }
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
  notesPublic: PropTypes.string.isRequired,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default OverviewSection
