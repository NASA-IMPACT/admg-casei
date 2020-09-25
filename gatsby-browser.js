/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 *
 * Note: There is an equivalent hook in Gatsby’s SSR API. It is recommended to use both APIs together.
 */

import React from "react"
import PropTypes from "prop-types"

import GlobalStyles from "./src/components/global-styles"
import AuthProvider from "./src/components/auth-provider"
import mapbox from "mapbox-gl"

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.hash) {
    return false
  }

  return true
}

mapbox.accessToken =
  "pk.eyJ1IjoiZGV2c2VlZCIsImEiOiJja2JxbjJhbGQybnpnMnJwdnk0NXloMmt1In0.5ciMNUW3yaadjwmlDLTugw"

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      <GlobalStyles />
      {element}
    </AuthProvider>
  )
}

wrapRootElement.propTypes = {
  element: PropTypes.element,
}
