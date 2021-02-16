import React from "react"
import PropTypes from "prop-types"

import ExternalLink from "../external-link"
import { colors } from "../../utils/theme"

export default function ContentItem({
  id,
  label,
  info = "N/A",
  link,
  mode = "darkTheme",
}) {
  return (
    <div data-cy={id}>
      <label
        style={{
          color: colors[mode].altText,
        }}
        data-cy={`${id}-label`}
      >
        {label}
      </label>

      {link ? (
        <p>
          <ExternalLink id={id} label={info} url={link} />
        </p>
      ) : (
        <p data-cy={`${id}-text`}>{info || "N/A"}</p>
      )}
    </div>
  )
}

ContentItem.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  link: PropTypes.string,
  mode: PropTypes.oneOf(["lightTheme", "darkTheme"]),
}
