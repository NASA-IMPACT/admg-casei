import React from "react"
import PropTypes from "prop-types"
import { PropTypeIsUrl } from "../utils/helpers"
import theme from "../utils/theme"

export default function ExternalLink({ label, url, id, isLight }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      style={{ color: isLight ? theme.color.linkDark : theme.color.link }}
      data-cy={`${id}-link`}
    >
      {label}
    </a>
  )
}

ExternalLink.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  url: PropTypeIsUrl,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isLight: PropTypes.bool,
}
