import React from "react"
import PropTypes from "prop-types"
import { Button } from "@devseed-ui/button"

import theme from "../utils/theme"

const Chip = ({ id, label, chipAction, actionId }) => (
  <div
    style={{
      display: `flex`,
      alignItems: `center`,
      backgroundColor: theme.color.secondary,
      color: theme.type.base.color,
      borderRadius: theme.shape.rounded,
      padding: `0 0.5rem`,
      margin: `0 0.5rem`,
    }}
    data-cy={`${id}-chip`}
  >
    <small>{label}</small>
    {chipAction && (
      <Button
        useIcon="xmark"
        variation="achromic-plain"
        hideText
        size="small"
        id="close-icon"
        title="remove filter"
        theme={theme} // TODO: figure out why the theme isn't automatically passed through
        style={{ marginLeft: `0.5rem` }}
        onClick={() => chipAction(actionId)}
      >
        close icon
      </Button>
    )}
  </div>
)

Chip.propTypes = {
  id: PropTypes.string.isRequired,
  actionId: PropTypes.string,
  label: PropTypes.string.isRequired,
  chipAction: PropTypes.func,
}

export default Chip
