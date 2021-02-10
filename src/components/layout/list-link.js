import React from "react"
import PropTypes from "prop-types"

import ExternalLink from "../external-link"
import { isUrl, PropTypeIsUrl } from "../../utils/helpers"

const ListLink = props => (
  <li style={{ padding: props.noPadding ? 0 : `1rem` }}>
    {isUrl(props.to) ? (
      <ExternalLink
        label={props.children}
        url={props.to}
        id={props.children}
        isLight
      />
    ) : (
      <p className="placeholder">{props.children}</p> // fallback for invalid url
    )}
  </li>
)

ListLink.propTypes = {
  to: PropTypeIsUrl,
  noPadding: PropTypes.bool,
  noBorder: PropTypes.bool,
  children: PropTypes.string.isRequired,
}

export default ListLink
