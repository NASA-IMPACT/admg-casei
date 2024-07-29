import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

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
  (
    { children, action, mode = NEGATIVE, isSecondary, as, iconOnly, noBorder },
    ref
  ) => {
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
            display: inline-flex;
            flex-flow: row nowrap;
            justify-content: center;
            align-items: center;
            user-select: none;
            color: ${colors[overrideMode].text};
            text-align: center;
            vertical-align: middle;
            padding: ${iconOnly ? "0.5rem" : "0.25rem 0.75rem"};
            background: none;
            text-shadow: none;
            border: ${noBorder
              ? "none"
              : `1px solid ${colors[overrideMode].text}`};
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
  iconOnly: PropTypes.bool,
  noBorder: PropTypes.bool,
  as: PropTypes.string,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
Button.displayName = "Button"

export default Button

export const IconButton = ({ id, icon, action, type }) => (
  <Clickable
    type={type || "button"}
    onClick={action}
    css={`
      background: none;
      border: none;
      flex-grow: 0;
      cursor: pointer;
      color: ${colors[NEGATIVE].text};
      vertical-align: middle;
    `}
    data-cy={id}
  >
    <span
      role="img"
      aria-label={`${id}-icon`}
      css={`
        display: flex;
        align-content: center;
      `}
    >
      {icon}
    </span>
  </Clickable>
)

IconButton.propTypes = {
  id: PropTypes.string.isRequired,
  action: PropTypes.func,
  icon: PropTypes.node.isRequired,
  type: PropTypes.string,
}
