/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Nav from "./nav"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      style={{
        display: `flex`,
        minHeight: `100vh`,
        flexDirection: `column`,
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title}>
        <Nav />
      </Header>
      <div
        style={{
          margin: `0 auto`,
          width: `100%`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
          flexGrow: 1,
        }}
      >
        <main>{children}</main>
      </div>
      <footer
        style={{
          flexShrink: 0,
          alignSelf: `flex-end`,
        }}
      >
        © {new Date().getFullYear()}, Built by{" "}
        <a href="https://www.developmentseed.org">Development Seed</a>.
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
