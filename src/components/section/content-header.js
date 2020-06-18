import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

export default function ContentHeader({ label, dataCy }) {
  return (
    <label
      style={{
        textTransform: `uppercase`,
        color: theme.color.gray,
        fontSize: `x-small`,
        borderBottom: `1px solid ${theme.color.gray}`,
        display: `block`,
      }}
      data-cy={`${dataCy}-label`}
    >
      {label}
    </label>
  )
}

ContentHeader.propTypes = {
  label: PropTypes.string.isRequired,
  dataCy: PropTypes.string.isRequired,
}
