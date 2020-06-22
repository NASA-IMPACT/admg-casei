import React from "react"
import PropTypes from "prop-types"

import theme from "../utils/theme"

export default function Label({
  children,
  dataCy,
  color = theme.color.gray,
  showBorder,
}) {
  return (
    <label
      style={{
        textTransform: `uppercase`,
        color: color,
        borderBottom: showBorder ? `1px solid ${theme.color.gray}` : `none`,
        fontSize: `small`,
        display: `block`,
      }}
      data-cy={`${dataCy}-label`}
    >
      {children}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
  dataCy: PropTypes.string.isRequired,
  color: PropTypes.string,
  showBorder: PropTypes.bool,
}
