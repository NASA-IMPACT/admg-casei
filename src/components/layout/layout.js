/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useRef } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import "@reach/listbox/styles.css"
import "@reach/accordion/styles.css"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"
import "../global.css"

import Header from "../header"
import Nav from "../nav"
import Footer from "../footer"

import { POSITIVE } from "../../utils/constants"
import { useContainerDimensions } from "../../utils/use-container-dimensions"
import { breakpoints } from "../../theme"

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  main {
    flex: 1;
  }
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
  const container = useRef(null)
  const { width } = useContainerDimensions(container)
  const isMediumDown = width <= breakpoints["sm"].slice(0, -2)

  return (
    <Container id="top" data-cy="page" ref={container}>
      <Header
        shortname={data.site.siteMetadata.shortname}
        mode={POSITIVE}
        isMediumDown={isMediumDown}
      >
        <Nav mode={POSITIVE} />
      </Header>

      <main>{children}</main>

      <Footer shortname={data.site.siteMetadata.shortname} />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
