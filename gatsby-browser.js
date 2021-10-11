/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 *
 * Note: There is an equivalent hook in Gatsby’s SSR API. It is recommended to use both APIs together.
 */

import React from "react"
import PropTypes from "prop-types"

import "@fontsource/titillium-web"

import FBMProvider from "./src/components/fbm-provider"

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.hash) {
    return false
  }

  return true
}

export const wrapRootElement = ({ element }) => {
  return <FBMProvider>{element}</FBMProvider>
}

wrapRootElement.propTypes = {
  element: PropTypes.element,
}
