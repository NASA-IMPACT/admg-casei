import React from "react"
import PropTypes from "prop-types"

import Label from "../label"
import ExternalLink from "../external-link"

export default function ContentItem({
  id,
  label,
  info = "N/A",
  link,
  shortenText,
}) {
  const text =
    info && shortenText ? (
      <p
        data-cy={`${id}-text`}
        style={{
          whiteSpace: `nowrap`,
          overflow: `hidden`,
          textOverflow: `ellipsis`,
          maxWidth: `250px`,
        }}
        title={info}
      >
        {info}
      </p>
    ) : (
      <p data-cy={`${id}-text`}>{info || "N/A"}</p>
    )
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
  shortenText: PropTypes.bool,
}

ContentItem.defaultProps = {
  shortenText: false,
}
