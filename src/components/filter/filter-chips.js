import React from "react"
import PropTypes from "prop-types"

import { IconButton } from "../button"
import { TrashIcon } from "../../icons"

export default function FilterChips({ clearFilters, children }) {
  return (
    <div
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        margin: `2rem 0`,
        alignItems: `center`,
      }}
    >
      Active filters:
      {children}
      {children.flat().filter(c => c).length > 1 && (
        <IconButton
          id="clear-filters"
          action={clearFilters}
          icon={<TrashIcon />}
        />
      )}
    </div>
  )
}

FilterChips.propTypes = {
  children: PropTypes.node,
  clearFilters: PropTypes.func.isRequired,
}
