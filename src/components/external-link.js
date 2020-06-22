import React from "react"
import PropTypes from "prop-types"
import theme from "../utils/theme"

export default function ExternalLink({ label, url, dataCy }) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      style={{ color: theme.color.link }}
      data-cy={`${dataCy}-link`}
    >
      {label}
    </a>
  )
}

ExternalLink.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  dataCy: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}
