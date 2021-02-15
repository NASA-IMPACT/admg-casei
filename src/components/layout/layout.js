/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import "@reach/listbox/styles.css"
import "@reach/accordion/styles.css"
import "@reach/menu-button/styles.css"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"
import "../global.css"

import Header from "../header"
import Nav from "../nav"
import Footer from "../footer"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

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
      <Header shortname={data.site.siteMetadata.shortname}>
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
