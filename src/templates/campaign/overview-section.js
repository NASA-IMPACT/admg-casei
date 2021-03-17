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
import { POSITIVE } from "../../utils/constants"
import { colors } from "../../theme"

const OverviewSection = ({
  id,
  aliases,
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
  <Section id={id} mode={POSITIVE}>
    <VisuallyHidden>
      <SectionHeader headline="Overview" id={id} />
    </VisuallyHidden>
    <SectionContent mode={POSITIVE} columns={[1, 8]}>
      <h3>The Campaign</h3>

      <p data-cy="description">{description}</p>

      {aliases.length ? (
        <p
          css={`
            margin-top: 2rem;
          `}
          data-cy="aliases"
        >
          <label
            css={`
              color: ${colors[POSITIVE].altText};
            `}
          >
            {aliases.length === 1 ? "Alias" : "Aliases"}:{" "}
          </label>
          {aliases.map((a, i) => (i > 0 ? `, ${a.shortname}` : a.shortname))}
        </p>
      ) : null}

      <div
        css={`
          margin-top: 3rem;
          display: grid;
          column-gap: 2rem;
          grid-auto-flow: column;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr auto 1fr;
        `}
      >
        <ContentItem
          id="overview-content"
          label="Study dates"
          info={`${startdate} — ${enddate || "ongoing"}`}
          mode={POSITIVE}
        />
        <hr />
        <ContentItem
          id="overview-content"
          label="Region"
          info={region}
          mode={POSITIVE}
        />

        <ContentItem
          id="overview-content"
          label="Season of Study"
          info={seasonListing}
          mode={POSITIVE}
        />
        <hr />
        <ContentItem
          id="overview-content"
          label="Spatial bounds (WKT)"
          info={bounds}
          mode={POSITIVE}
        />
      </div>
    </SectionContent>

    <SectionContent mode={POSITIVE} columns={[10, 3]}>
      <ul
        css={`
          margin: 0;
          list-style: none;
        `}
        data-cy="link-list"
      >
        <li
          css={`
            padding: 1rem;
            border: 1px solid hsla(0, 0%, 0%, 0.2);
            margin-bottom: 3rem;
          `}
        >
          {doi ? (
            <p
              css={`
                white-space: nowrap;
                overflow: hidden;
                line-height: 1.5rem;
                text-overflow: ellipsis;
              `}
            >
              Campaign DOI:
              <br />
              <ExternalLink label={doi} url={doi} id="doi" mode={POSITIVE} />
            </p>
          ) : (
            <p data-cy="doi-link">no campaign DOI available</p>
          )}
        </li>

        {repositoryWebsite && (
          <ListLink mode={POSITIVE} to={repositoryWebsite}>
            Repository website
          </ListLink>
        )}
        {projectWebsite && (
          <ListLink mode={POSITIVE} to={projectWebsite}>
            Project website
          </ListLink>
        )}
        {tertiaryWebsite && (
          <ListLink mode={POSITIVE} to={tertiaryWebsite}>
            Tertiary website
          </ListLink>
        )}
        {publicationLink && (
          <ListLink mode={POSITIVE} to={publicationLink}>
            Overview Publication
          </ListLink>
        )}
      </ul>
    </SectionContent>

    <SectionContent mode={POSITIVE} columns={[1, 8]}>
      <h3>Additional Notes</h3>
      <p data-cy="notes-public">{notesPublic}</p>
    </SectionContent>
    <SectionContent mode={POSITIVE} columns={[1, 8]}>
      <h3>Repositories</h3>
      <ul
        css={`
          margin: 0;
          list-style: none;
        `}
        data-cy="repo-list"
      >
        {repositories.map(repo => (
          <ListLink key={repo.id} to={repo.url} mode={POSITIVE} noPadding>
            {repo.longname}
          </ListLink>
        ))}
      </ul>
    </SectionContent>
  </Section>
)

export const overviewFields = graphql`
  fragment overviewFields on campaign {
    aliases: aliases {
      shortname: short_name
    }
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
  aliases: PropTypes.arrayOf(
    PropTypes.shape({
      shortname: PropTypes.string.isRequired,
    }).isRequired
  ),
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
