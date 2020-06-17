import React from "react"
import PropTypes from "prop-types"
import theme from "../utils/theme"

export default function ExternalLink({ label, url }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      style={{ color: theme.color.link }}
      data-cy="external-link"
    >
      {label}
    </a>
  )
}

ExternalLink.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
