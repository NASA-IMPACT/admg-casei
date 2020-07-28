/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import PropTypes from "prop-types"
import { DevseedUiThemeProvider } from "@devseed-ui/helpers"

import theme from "./src/utils/theme"
import GlobalStyles from "./src/components/global-styles"
import AuthProvider from "./src/components/auth-provider"

export const wrapRootElement = ({ element }) => {
  return (
    <DevseedUiThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>{element}</AuthProvider>
    </DevseedUiThemeProvider>
  )
}

wrapRootElement.propTypes = {
  element: PropTypes.element,
}
