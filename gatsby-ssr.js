/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 * Note: There is an equivalent hook in Gatsby’s Browser API. It is recommended to use both APIs together.
 */

import React from "react"
import PropTypes from "prop-types"
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

wrapRootElement.propTypes = {
  element: PropTypes.element,
}
