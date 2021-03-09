import React from "react"
import PropTypes from "prop-types"

import ExternalLink from "../external-link"
import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { isUrl, PropTypeIsUrl } from "../../utils/helpers"

const ListLink = props => (
  <li style={{ padding: props.noPadding ? 0 : `1rem 0` }}>
    {isUrl(props.to) ? (
      <ExternalLink
        label={props.children}
        url={props.to}
        id={props.children}
        mode={props.mode}
      />
    ) : (
      <p className="placeholder">{props.children}</p> // fallback for invalid url
    )}
  </li>
)

ListLink.propTypes = {
  to: PropTypeIsUrl,
  noPadding: PropTypes.bool,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
  children: PropTypes.string.isRequired,
}

export default ListLink
