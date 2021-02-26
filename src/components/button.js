import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { POSITIVE, NEGATIVE } from "../utils/constants"
import { colors } from "../utils/theme"

const Clickable = styled.button`
  &:hover {
    opacity: 0.64;
  }
  &:active {
    transform: translate(0, 1px);
  }
`

const Button = React.forwardRef(
  ({ children, action, mode = NEGATIVE, isSecondary }, ref) => {
    // flip mode for primary buttons
    const overrideMode = isSecondary
      ? mode
      : mode === NEGATIVE
      ? POSITIVE
      : NEGATIVE

    return (
      <Clickable
        ref={ref}
        onClick={action}
        css={`
           {
            user-select: none;
            color: ${colors[overrideMode].text};
            text-align: center;
            vertical-align: middle;
            padding: 0.25rem 0.75rem;
            background: none;
            text-shadow: none;
            border: 1px solid ${colors[overrideMode].text};
            cursor: pointer;
            background-color: ${isSecondary
              ? "transparent"
              : colors[overrideMode].background};
            font-weight: bold;
            white-space: nowrap;
          }
        `}
      >
        {children}
      </Clickable>
    )
  }
)

Button.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
  isSecondary: PropTypes.bool,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
Button.displayName = "Button"

export default Button

export const IconButton = ({ id, icon, action }) => (
  <Clickable
    type="button"
    onClick={action}
    style={{
      background: "none",
      border: "none",
      flexGrow: 0,
      cursor: `pointer`,
      color: colors[NEGATIVE].text,
      verticalAlign: `middle`,
      marginLeft: `0.5rem`,
    }}
    data-cy={id}
  >
    <span role="img" aria-label={`${id}-icon`}>
      {icon}
    </span>
  </Clickable>
)

IconButton.propTypes = {
  id: PropTypes.string.isRequired,
  action: PropTypes.func,
  icon: PropTypes.node.isRequired,
}
