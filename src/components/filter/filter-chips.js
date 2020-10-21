import React from "react"
import PropTypes from "prop-types"
import { TrashIcon } from "../icons"
import { IconButton } from "../button"
import Chip from "../chip"

export default function FilterChips({
  selectedFilterIds,
  setSelectedFilterIds,
  clearFilters,
}) {
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
      {selectedFilterIds.map(f => (
        <Chip
          key={f}
          actionId={f}
          id="filter"
          label={f}
          chipAction={() =>
            setSelectedFilterIds(selectedFilterIds.filter(id => id !== f))
          }
        />
      ))}
      {selectedFilterIds.length > 1 && (
        <IconButton
          id="clear-filters"
          action={() => clearFilters()}
          icon={<TrashIcon />}
        />
      )}
    </div>
  )
}

FilterChips.propTypes = {
  selectedFilterIds: PropTypes.array,
  setSelectedFilterIds: PropTypes.func,
  clearFilters: PropTypes.func,
}
