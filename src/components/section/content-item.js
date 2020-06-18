import React from "react"
import PropTypes from "prop-types"

import ContentHeader from "./content-header"
import ExternalLink from "../external-link"

export default function ContentItem({
  label,
  info = "N/A",
  type = "text",
  dataCy,
}) {
  let displayedInfo = {
    link: <ExternalLink dataCy={dataCy} label={info} url={info} />, // TODO: find out why this causes proptypes to flag the props as objects
    component: info,
    text: <p data-cy={`${dataCy}-text`}>{info}</p>,
  }[type]

  return (
    <div data-cy={dataCy}>
      <ContentHeader label={label} dataCy={dataCy} />
      {displayedInfo}
    </div>
  )
}

ContentItem.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
  dataCy: PropTypes.string.isRequired,
}
