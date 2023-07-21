/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Slice } from "gatsby"
import styled from "@emotion/styled"

import "@reach/listbox/styles.css"
import "@reach/accordion/styles.css"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"
import "../global.css"

import Header from "../header"
import Nav from "../nav"
import Footer from "../footer"

import { POSITIVE } from "../../utils/constants"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  min-width: 768px;
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
    <Container id="top" data-cy="page">
      <Header shortname={data.site.siteMetadata.shortname} mode={POSITIVE}>
        <Nav mode={POSITIVE} />
      </Header>

      <main>{children}</main>

      <Slice alias="footer" shortname={data.site.siteMetadata.shortname} />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
