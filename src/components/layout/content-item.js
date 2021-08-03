import React from "react"
import PropTypes from "prop-types"

import ExternalLink from "../external-link"
import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

export default function ContentItem({
  id,
  label,
  info = "Currently unavailable",
  link,
  mode = NEGATIVE,
}) {
  return (
    <div data-cy={id}>
      <label
        css={`
          color: ${colors[mode].altText};
        `}
        data-cy={`${id}-label`}
      >
        {label}
      </label>

      {link ? (
        <p>
          <ExternalLink id={id} label={info} url={link} />
        </p>
      ) : (
        <p data-cy={`${id}-text`}>{info || "Currently unavailable"}</p>
      )}
    </div>
  )
}

ContentItem.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  link: PropTypes.string,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
}
