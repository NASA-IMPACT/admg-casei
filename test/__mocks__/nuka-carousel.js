import React from "react"

// This mock is required to run snapshot tests on nuka carousel
// https://github.com/FormidableLabs/nuka-carousel/issues/598

module.exports = {
  __esModule: true,
  ...jest.requireActual("nuka-carousel"),
  default: ({ children }) => (
    <div data-test="mocked-nuka-carousel">{children}</div>
  ),
  Element: jest.fn(),
}
