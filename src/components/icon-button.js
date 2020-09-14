import React from "react"
import PropTypes from "prop-types"

import theme from "../utils/theme"

const IconButton = ({ id, icon, action }) => (
  <button
    type="button"
    onClick={action}
    style={{
      background: "none",
      border: "none",
      flexGrow: 0,
      cursor: `pointer`,
      color: theme.color.base,
      verticalAlign: `middle`,
      marginLeft: `0.5rem`,
    }}
    data-cy={id}
  >
    <span role="img" aria-label={`${id}-icon`}>
      {icon}
    </span>
  </button>
)

IconButton.propTypes = {
  id: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
}

export default IconButton
