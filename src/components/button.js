import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { POSITIVE, NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const Clickable = styled.button`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  user-select: none;
  color: ${({ overrideMode }) => overrideMode && colors[overrideMode].text};
  text-align: center;
  vertical-align: middle;
  padding: ${({ iconOnly }) => (iconOnly ? "0.5rem" : "0.25rem 0.75rem")};
  background: none;
  text-shadow: none;
  border: ${({ noBorder, overrideMode }) =>
    overrideMode &&
    (noBorder ? "none" : `1px solid ${colors[overrideMode].text}`)};
  cursor: pointer;
  background-color: ${({ isSecondary, mode, overrideMode }) =>
    overrideMode &&
    (isSecondary ? colors[mode].background : colors[overrideMode].background)};
  font-weight: bold;
  white-space: nowrap;
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
        mode={mode}
        overrideMode={overrideMode}
        isSecondary={isSecondary}
        iconOnly={iconOnly}
        noBorder={noBorder}
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

const ClickableIcon = styled(Clickable)`
  background: none;
  border: none;
  flex-grow: 0;
  padding: 0.5rem;
  cursor: pointer;
  color: ${colors[NEGATIVE].text};
  vertical-align: middle;
`

export const IconButton = ({ id, icon, action, type }) => (
  <ClickableIcon type={type || "button"} onClick={action} data-cy={id}>
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
  </ClickableIcon>
)

IconButton.propTypes = {
  id: PropTypes.string.isRequired,
  action: PropTypes.func,
  icon: PropTypes.node.isRequired,
  type: PropTypes.string,
}
