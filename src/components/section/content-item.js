import React from "react"
import PropTypes from "prop-types"

import ContentHeader from "./content-header"
import ExternalLink from "../external-link"

export default function ContentItem({ label, info, type = "text", dataCy }) {
  return (
    <div data-cy={dataCy}>
      <ContentHeader dataCy={dataCy} label={label} />
      {type === "link" && info ? (
        <ExternalLink dataCy={dataCy} label={info} url={info} />
      ) : (
        <p data-cy={`${dataCy}-text`}>{info || "N/A"}</p>
      )}
    </div>
  )
}

ContentItem.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  type: PropTypes.string,
  dataCy: PropTypes.string,
}
