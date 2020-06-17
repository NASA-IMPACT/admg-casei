import React from "react"
import PropTypes from "prop-types"

import ContentHeader from "./content-header"

export default function ContentItem({ label, info }) {
  return (
    <div data-cy="info-item">
      <ContentHeader label={label} />
      <p>{info}</p>
    </div>
  )
}

ContentItem.propTypes = {
  label: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired,
}
