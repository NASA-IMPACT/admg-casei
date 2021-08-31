import React from "react"
import PropTypes from "prop-types"

export default function ContentGroup({ children }) {
  return (
    <div
      css={`
        flex: 2.618;
        display: grid;
        gap: 1.5rem;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
        padding: 2rem;
      `}
    >
      {children}
    </div>
  )
}

ContentGroup.propTypes = {
  children: PropTypes.node.isRequired,
}
