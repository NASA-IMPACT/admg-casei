import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import ExternalLink from "../../components/external-link"
import { isUrl } from "../../utils/helpers"
import { SectionBlock } from "../../components/section"

export default function Resources({ onlineInformation }) {
  const links = onlineInformation.split("\n")
  return (
    <SectionBlock headline="Related Information" id="instrument-resources">
      <ol>
        {links.map(link => (
          <li key={link}>
            <ExternalLink />
            {isUrl(link) ? (
              <ExternalLink label={link} url={link} id="instrument-resource" />
            ) : (
              <p className="placeholder">{link}</p> // fallback for invalid url
            )}
          </li>
        ))}
      </ol>
    </SectionBlock>
  )
}
export const instrumentResourcesFields = graphql`
  fragment instrumentResourcesFields on instrument {
    onlineInformation: online_information
  }
`

Resources.propTypes = {
  onlineInformation: PropTypes.string.isRequired,
}
