import React from "react"
import PropTypes from "prop-types"
import styled from "@emotion/styled"

import { POSITIVE, NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const Clickable = styled.button`
  &:hover {
    opacity: 0.64;
  }
  &:active {
    transform: translate(0, 1px);
  }
`

const Button = React.forwardRef(
  ({ children, action, mode = NEGATIVE, isSecondary, as }, ref) => {
    // flip mode for primary buttons
    const overrideMode = isSecondary
      ? mode
      : mode === NEGATIVE
      ? POSITIVE
      : NEGATIVE

    return (
      <Clickable
        as={as}
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
              ? colors[mode].background
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
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  action: PropTypes.func,
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
  isSecondary: PropTypes.bool,
  as: PropTypes.string,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
Button.displayName = "Button"

export default Button

export const IconButton = ({ id, icon, action }) => (
  <Clickable
    type="button"
    onClick={action}
    css={`
      background: none;
      border: none;
      flex-grow: 0;
      cursor: pointer;
      color: ${colors[NEGATIVE].text};
      vertical-align: middle;
      margin-left: 0.5rem;
    `}
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
