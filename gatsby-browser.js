/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { DevseedUiThemeProvider } from "@devseed-ui/helpers"

import theme from "./src/utils/theme"
import GlobalStyles from "./src/components/global-styles"

export const wrapRootElement = ({ element }) => {
  return (
    <DevseedUiThemeProvider theme={theme}>
      <GlobalStyles />
      {element}
    </DevseedUiThemeProvider>
  )
}
