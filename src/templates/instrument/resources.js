import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import ExternalLink from "../../components/external-link"
import { isUrl } from "../../utils/helpers"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"

export default function Resources({ id, onlineInformation }) {
  const links = onlineInformation ? onlineInformation.split("\n") : null

  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Related Information" id={id} />
      <SectionContent>
        {links ? (
          <ol>
            {links.map(link => (
              <li key={link}>
                {isUrl(link) ? (
                  <ExternalLink
                    label={link}
                    url={link}
                    id="instrument-resource"
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
      </SectionContent>
    </SectionBlock>
  )
}
export const instrumentResourcesFields = graphql`
  fragment instrumentResourcesFields on instrument {
    onlineInformation: online_information
  }
`

Resources.propTypes = {
  id: PropTypes.string.isRequired,
  onlineInformation: PropTypes.string.isRequired,
}
