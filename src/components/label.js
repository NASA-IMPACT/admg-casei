import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../utils/constants"
import { colors } from "../utils/theme"

export default function Label({
  children,
  id,
  color = colors[NEGATIVE].altText,
  showBorder,
  display,
}) {
  return (
    <label
      style={{
        color: color,
        borderBottom: showBorder
          ? `1px solid ${colors[NEGATIVE].altText}`
          : `none`,
        display,
      }}
      data-cy={`${id}-label`}
    >
      {children}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  showBorder: PropTypes.bool,
  display: PropTypes.string,
}

Label.defaultProps = {
  display: "block",
}
