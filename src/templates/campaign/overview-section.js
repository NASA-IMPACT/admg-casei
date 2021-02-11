import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import VisuallyHidden from "@reach/visually-hidden"

import {
  Section,
  SectionHeader,
  SectionContent,
  ContentItem,
  ListLink,
} from "../../components/layout"
import ExternalLink from "../../components/external-link"

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
          marginTop: `3rem`,
          display: `grid`,
          columnGap: `2rem`,
          gridAutoFlow: `column`,
          gridTemplateColumns: `1fr 1fr`,
          gridTemplateRows: ` 1fr auto 1fr`,
        }}
      >
        <ContentItem
          id="overview-content"
          label="Study dates"
          info={`${startdate} — ${enddate || "ongoing"}`}
          isLight
        />
        <hr />
        <ContentItem
          id="overview-content"
          label="Region"
          info={region}
          isLight
        />

        <ContentItem
          id="overview-content"
          label="Season of Study"
          info={seasonListing}
          isLight
        />
        <hr />
        <ContentItem
          id="overview-content"
          label="Spatial bounds (WKT)"
          info={bounds}
          isLight
        />
      </div>
    </SectionContent>

    <SectionContent columns={[10, 3]}>
      <ul style={{ margin: 0, listStyle: `none` }} data-cy="link-list">
        <li
          style={{
            padding: `1rem`,
            border: `1px solid hsla(0,0%,0%,0.2)`,
            marginBottom: `3rem`,
          }}
        >
          {doi ? (
            <p
              style={{
                whiteSpace: `nowrap`,
                overflow: `hidden`,
                lineHeight: `1.5rem`,
                textOverflow: `ellipsis`,
              }}
            >
              Campaign DOI:
              <br />
              <ExternalLink label={doi} url={doi} id="doi" isLight />
            </p>
          ) : (
            <p data-cy="doi-link">no campaign DOI available</p>
          )}
        </li>

        {repositoryWebsite && (
          <ListLink isLight to={repositoryWebsite}>
            Repository website
          </ListLink>
        )}
        {projectWebsite && (
          <ListLink isLight to={projectWebsite}>
            Project website
          </ListLink>
        )}
        {tertiaryWebsite && (
          <ListLink isLight to={tertiaryWebsite}>
            Tertiary website
          </ListLink>
        )}
        {publicationLink && (
          <ListLink isLight to={publicationLink}>
            Overview Publication
          </ListLink>
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
          <ListLink key={repo.id} to={repo.url} isLight noPadding>
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
      url: notes_public
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
      url: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default OverviewSection
