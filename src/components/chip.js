import React from "react"
import PropTypes from "prop-types"

import { CloseIcon } from "./icons"
import { IconButton } from "./button"
import theme from "../utils/theme"

const Chip = ({ id, label, chipAction, actionId, isDark, isInline }) => (
  <div
    style={{
      display: isInline ? `inline-flex` : `flex`,
      alignItems: `center`,
      backgroundColor: isDark ? theme.color.primary : theme.color.secondary,
      color: theme.color.base,
      borderRadius: theme.shape.rounded,
      padding: `0 0.5rem`,
      margin: `0.25rem 0.5rem`,
    }}
    data-cy={`${id}-chip`}
  >
    <small>{label}</small>
    {chipAction && (
      <IconButton
        id="remove-filter"
        action={() => chipAction(actionId)}
        icon={<CloseIcon color={theme.color.base} />}
      />
    )}
  </div>
)

Chip.propTypes = {
  id: PropTypes.string.isRequired,
  actionId: PropTypes.string,
  label: PropTypes.string.isRequired,
  chipAction: PropTypes.func,
  isDark: PropTypes.bool,
  isInline: PropTypes.bool,
}

Chip.defaultProps = {
  isDark: false,
  isInline: false,
}

export default Chip
