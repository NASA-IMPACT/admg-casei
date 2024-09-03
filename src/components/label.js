import React from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

export default function Label({
  children,
  id,
  color = colors[NEGATIVE].altText,
  showBorder,
  display = "block",
}) {
  return (
    <label
      css={`
        color: ${color};
        border-bottom: ${showBorder
          ? `1px solid ${colors[NEGATIVE].altText}`
          : `none`};
        display: ${display};
      `}
      data-cy={`${id}-label`}
    >
      {children}
    </label>
  )
}

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.string,
  showBorder: PropTypes.bool,
  display: PropTypes.string,
}
