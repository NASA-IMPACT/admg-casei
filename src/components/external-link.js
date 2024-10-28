import React from "react"
import PropTypes from "prop-types"

import { POSITIVE, NEGATIVE } from "../utils/constants"
import { PropTypeIsUrl } from "../utils/helpers"
import { colors, breakpoints } from "../theme"
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
        display: inline-flex;
        flex-flow: row nowrap;
        gap: 0.25rem;
        align-items: center;
        svg {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
        }
        @media screen and (min-width: ${breakpoints["sm"]}) {
          /* flex-flow: row wrap; */
        }
      `}
      data-cy={`${id}-link`}
    >
      <span
        css={`
          overflow-wrap: anywhere;
        `}
      >
        {label || children}
      </span>
      <ExternalLinkIcon color={colors[mode].linkText} />
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
