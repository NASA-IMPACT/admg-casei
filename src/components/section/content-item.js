import React from "react"
import PropTypes from "prop-types"

import Label from "../label"
import ExternalLink from "../external-link"

export default function ContentItem({ label, info, type = "text", dataCy }) {
  return (
    <div data-cy={dataCy}>
      <Label dataCy={dataCy} showBorder data-cy={`${dataCy}-label`}>
        {label}
      </Label>
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
