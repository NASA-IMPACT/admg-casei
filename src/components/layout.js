/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "@reach/listbox/styles.css"
import "mapbox-gl/dist/mapbox-gl.css"
import "./global.css"

import Header from "./header"
import Nav from "./nav"
import Footer from "./footer"

import theme from "../utils/theme"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

export const Paragraph = styled.p`
  margin-bottom: 1rem;
`

export const PageBody = ({ children, id }) => (
  <section
    style={{
      width: `100%`,
      maxWidth: theme.layout.maxWidth,
      margin: `0 auto`,
      padding: `0 ${theme.layout.pageMargin}`,
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
    <Container id="top">
      <Header
        siteTitle={data.site.siteMetadata.title}
        shortname={data.site.siteMetadata.shortname}
      >
        <Nav />
      </Header>
      <main style={{ flexGrow: 1 }}>{children}</main>
      <Footer shortname={data.site.siteMetadata.shortname} />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
