import React, { createContext, useState } from 'react';
export const ButtonContext = createContext();
import styled from "@emotion/styled"
import { POSITIVE, NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
const Clickable = styled.button`
  &:hover {
    opacity: 0.64;
  }
  &:active {
    transform: translate(0, 1px);
  }
`

export const ButtonProvider = ({ children, action, mode = NEGATIVE, isSecondary, as }, ref) => {
    // flip mode for primary buttons
    const overrideMode = isSecondary
        ? mode
        : mode === NEGATIVE
            ? POSITIVE
            : NEGATIVE
    return (
        <ButtonContext.Provider
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
        </ButtonContext.Provider>
    )
}