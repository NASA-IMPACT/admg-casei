import React from "react"
import PropTypes from "prop-types"

export const EventPanel = ({ children }) => {
  return (
    <div
      css={`
        width: 100%;
        height: 100%;
        border: solid white 1px;
        padding: 0.6em;
      `}
    >
      {children}
    </div>
  )
}

EventPanel.propTypes = {
  children: PropTypes.node.isRequired,
}
