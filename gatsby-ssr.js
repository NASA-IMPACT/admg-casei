/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 * Note: There is an equivalent hook in Gatsby’s Browser API. It is recommended to use both APIs together.
 */

import React from "react"
import PropTypes from "prop-types"
import Layout from "./src/components/layout"

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
