import React from "react"
import PropTypes from "prop-types"

import { PropTypeIsUrl } from "../utils/helpers"
import theme from "../utils/theme"
import { LinkText } from "../theme/typography"

export default function ExternalLink({ label, url, id }) {
  return (
    <LinkText
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      style={{ color: theme.color.link }}
      data-cy={`${id}-link`}
    >
      {label}
    </LinkText>
  )
}

ExternalLink.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  url: PropTypeIsUrl,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}
