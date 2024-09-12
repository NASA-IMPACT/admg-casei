/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 *
 * Note: There is an equivalent hook in Gatsby’s SSR API. It is recommended to use both APIs together.
 */
import React from "react"
import Layout from "./src/components/layout"
import "@fontsource/titillium-web"
import PropTypes from "prop-types"

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.hash) {
    return false
  }

  return true
}

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location.pathname)
  console.log("old pathname", prevLocation ? prevLocation.pathname : null)
}

export const wrapRootElement = ({ element }) => {
  return <>{element}</>
}

wrapRootElement.propTypes = {
  element: PropTypes.element,
}

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
