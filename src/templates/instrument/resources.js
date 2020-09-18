import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import ExternalLink from "../../components/external-link"
import Label from "../../components/label"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"
import { isUrl } from "../../utils/helpers"

export default function Resources({
  id,
  onlineInformation,
  overviewPublication,
  repositories,
}) {
  const links = onlineInformation ? onlineInformation.split("\n") : null

  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Related Information" id={id} />
      <SectionContent>
        <div style={{ padding: `1rem 0` }}>
          <Label id={"online-information"} showBorder>
            Online Information
          </Label>
          {links ? (
            <ol>
              {links.map(link => (
                <li key={link}>
                  {isUrl(link) ? (
                    <ExternalLink
                      label={link}
                      url={link}
                      id="online-information"
                    />
                  ) : (
                    <p className="placeholder">{link}</p> // fallback for invalid url
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p>No information available</p>
          )}
        </div>

        <div style={{ padding: `1rem 0` }}>
          <Label id={"overview-publication"} showBorder>
            Overview Publication
          </Label>
          {overviewPublication ? (
            isUrl(overviewPublication) ? (
              <ExternalLink
                label={overviewPublication}
                url={overviewPublication}
                id="overview-publication"
              />
            ) : (
              <p className="placeholder">{overviewPublication}</p> // fallback for invalid url
            )
          ) : (
            <p>No publication available</p>
          )}
        </div>

        <div style={{ padding: `1rem 0` }}>
          <Label id={"repositories"} showBorder>
            Repositories
          </Label>
          {repositories.length > 0 ? (
            <ul>
              {repositories.map(repository => (
                <li key={repository.id} data-cy="repository">
                  <p>{repository.longname}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No repository available</p>
          )}
        </div>
      </SectionContent>
    </SectionBlock>
  )
}
export const instrumentResourcesFields = graphql`
  fragment instrumentResourcesFields on instrument {
    onlineInformation: online_information
    overviewPublication: overview_publication
    repositories {
      id
      longname: long_name
    }
  }
`

Resources.propTypes = {
  id: PropTypes.string.isRequired,
  onlineInformation: PropTypes.string.isRequired,
  overviewPublication: PropTypes.string,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    })
  ),
}
