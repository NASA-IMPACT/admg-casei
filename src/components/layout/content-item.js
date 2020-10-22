import React from "react"
import PropTypes from "prop-types"

import Label from "../label"
import ExternalLink from "../external-link"

export default function ContentItem({ id, label, info = "N/A", link }) {
  const text = <p data-cy={`${id}-text`}>{info || "N/A"}</p>
  return (
    <div data-cy={id}>
      <Label id={id} showBorder>
        {label}
      </Label>
      {link ? <ExternalLink id={id} label={info} url={link} /> : text}
    </div>
  )
}

ContentItem.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  link: PropTypes.string,
}
