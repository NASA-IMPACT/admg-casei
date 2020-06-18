import React from "react"
import PropTypes from "prop-types"

import ContentHeader from "./content-header"
import ExternalLink from "../external-link"

export default function ContentItem({ label, info = "N/A", type = "text" }) {
  let displayedInfo = {
    link: <ExternalLink label={info} url={info} />, // TODO: find out why this causes proptypes to flag the props as objects
    component: info,
    text: <p data-cy="content-text">{info}</p>,
  }[type]

  return (
    <div data-cy="info-item">
      <ContentHeader label={label} />
      {displayedInfo}
    </div>
  )
}

ContentItem.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
}
