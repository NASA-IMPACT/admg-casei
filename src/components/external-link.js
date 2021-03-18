import React from "react"
import PropTypes from "prop-types"

import { POSITIVE, NEGATIVE } from "../utils/constants"
import { PropTypeIsUrl } from "../utils/helpers"
import { colors } from "../theme"

export default function ExternalLink({
  label,
  children,
  url,
  id,
  mode = NEGATIVE,
}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={url}
      style={{
        color: colors[mode].linkText,
      }}
      data-cy={`${id}-link`}
    >
      {label || children}
    </a>
  )
}

ExternalLink.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  url: PropTypeIsUrl,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
}
