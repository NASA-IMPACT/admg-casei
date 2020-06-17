import React from "react"
import PropTypes from "prop-types"

import ContentHeader from "./content-header"
import ExternalLink from "../external-link"

export default function ContentItem({ label, info, type = "text" }) {
  return (
    <div data-cy="info-item">
      <ContentHeader label={label} />
      {type === "link" ? (
        <ExternalLink label={info} url={info} />
      ) : (
        <p data-cy="content-text">{info || "N/A"}</p>
      )}
    </div>
  )
}

ContentItem.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
  type: PropTypes.string,
}
