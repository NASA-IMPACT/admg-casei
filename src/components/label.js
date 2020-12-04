import React from "react"
import PropTypes from "prop-types"

import theme from "../utils/theme"

export default function Label({
  children,
  id,
  color = theme.color.gray,
  showBorder,
  display,
}) {
  return (
    <label
      style={{
        color: color,
        borderBottom: showBorder ? `1px solid ${theme.color.gray}` : `none`,
        display,
      }}
      data-cy={`${id}-label`}
    >
      {children}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  showBorder: PropTypes.bool,
  display: PropTypes.string,
}

Label.defaultProps = { 
  display: "block"
}
