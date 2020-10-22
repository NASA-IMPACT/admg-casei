import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

export default function PageBody({ children, id }) {
  return (
    <div
      style={{
        width: `100%`,
        maxWidth: theme.layout.maxWidth,
        margin: `0 auto`,
        padding: `0 ${theme.layout.pageMargin}`,
      }}
      data-cy={`main-${id}`}
    >
      {children}
    </div>
  )
}

PageBody.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}
