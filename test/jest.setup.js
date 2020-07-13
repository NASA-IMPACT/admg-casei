import React from "react"
import "jest-styled-components"

// The following is required to run snapshot tests on nuka carousel
// https://github.com/FormidableLabs/nuka-carousel/issues/598

/* eslint-disable */
jest.mock("nuka-carousel", () => ({
  __esModule: true,
  ...jest.requireActual("nuka-carousel"),
  default: ({ children }) => (
    <div data-test="mocked-nuka-carousel">{children}</div>
  ),
}))
/* eslint-enable */
