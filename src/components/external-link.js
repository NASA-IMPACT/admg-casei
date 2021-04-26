import React from "react"
import PropTypes from "prop-types"

import { POSITIVE, NEGATIVE } from "../utils/constants"
import { PropTypeIsUrl } from "../utils/helpers"
import { colors } from "../theme"
import { ExternalLinkIcon } from "../icons"

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
      css={`
        color: ${colors[mode].linkText};
        display: flex;
        align-items: center;
      `}
      data-cy={`${id}-link`}
    >
      <ExternalLinkIcon color={colors[mode].linkText} />
      <span
        css={`
          padding-left: 4px;
        `}
      >
        {label || children}
      </span>
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
