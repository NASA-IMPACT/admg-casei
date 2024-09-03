import React from "react"
import PropTypes from "prop-types"

import { IconButton } from "./button"
import { CloseIcon } from "../icons"
import { NEGATIVE } from "../utils/constants"
import { colors, shape } from "../theme"

const Chip = ({
  id,
  label,
  removeAction,
  actionId,
  isDark = false,
  isInline = false,
  hoverText = "",
}) => (
  <div
    css={`
      display: ${isInline ? "inline-flex" : "flex"};
      align-items: center;
      background-color: ${isDark
        ? colors[NEGATIVE].altBackground
        : colors[NEGATIVE].background};
      color: ${colors[NEGATIVE].text};
      border-radius: ${shape.rounded};
      padding: 0.25rem 0.5rem;
      gap: 0.5rem;
    `}
    data-cy={`${id}-chip`}
  >
    <small title={hoverText}>{label}</small>
    {removeAction && (
      <IconButton
        id="remove-filter"
        action={() => removeAction(actionId)}
        icon={<CloseIcon color={colors[NEGATIVE].text} />}
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

export default Chip
