import React from "react"
import PropTypes from "prop-types"

import Label from "../label"
import ExternalLink from "../external-link"

export default function ContentItem({ label, info, type = "text", id }) {
  return (
    <div data-cy={id}>
      <Label id={id} showBorder>
        {label}
      </Label>
      {type === "link" && info ? (
        <ExternalLink id={id} label={info} url={info} />
      ) : (
        <p data-cy={`${id}-text`}>{info || "N/A"}</p>
      )}
    </div>
  )
}

ContentItem.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
}
