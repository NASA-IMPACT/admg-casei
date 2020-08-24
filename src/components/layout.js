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
import Footer from "./footer"

import theme from "../utils/theme"

export const PageBody = ({ children, id }) => (
  <section
    style={{
      margin: `0 auto`,
      width: `100%`,
      padding: `0 ${theme.layout.pageMargin}`,
      flexGrow: 1,
    }}
    data-cy={`main-${id}-section`}
  >
    {children}
  </section>
)

PageBody.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          shortname
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
      <Header
        siteTitle={data.site.siteMetadata.title}
        shortname={data.site.siteMetadata.shortname}
      >
        <Nav />
      </Header>
      <main>{children}</main>
      <Footer shortname={data.site.siteMetadata.shortname} />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
