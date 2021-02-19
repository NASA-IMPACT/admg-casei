import React from "react"
import PropTypes from "prop-types"

import { IconButton } from "./button"
import { CloseIcon } from "../icons"
import { colors, shape } from "../utils/theme"

const Chip = ({
  id,
  label,
  removeAction,
  actionId,
  isDark,
  isInline,
  hoverText,
}) => (
  <div
    style={{
      display: isInline ? `inline-flex` : `flex`,
      alignItems: `center`,
      backgroundColor: isDark
        ? colors.darkTheme.altBackground
        : colors.darkTheme.background,
      color: colors.darkTheme.text,
      borderRadius: shape.rounded,
      padding: `0.25rem 0.5rem`,
      margin: `0.25rem 0.5rem`,
    }}
    data-cy={`${id}-chip`}
  >
    <small title={hoverText}>{label}</small>
    {removeAction && (
      <IconButton
        id="remove-filter"
        action={() => removeAction(actionId)}
        icon={<CloseIcon color={colors.darkTheme.text} />}
      />
    )}
  </div>
)

Chip.propTypes = {
  id: PropTypes.string.isRequired,
  actionId: PropTypes.string,
  label: PropTypes.string,
  removeAction: PropTypes.func,
  isDark: PropTypes.bool,
  isInline: PropTypes.bool,
  hoverText: PropTypes.string,
}

Chip.defaultProps = {
  isDark: false,
  isInline: false,
  hoverText: "",
}

export default Chip
