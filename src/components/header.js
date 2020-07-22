import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Image from "./image"
import theme from "../utils/theme"

const Header = ({ siteTitle, shortname, children }) => (
  <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: theme.layout.maxWidth,
        padding: `2rem 5rem`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
      }}
    >
      <div
        style={{
          margin: 0,
          fontSize: `1.5rem`,
          lineHeight: `1.5rem`,
          zIndex: 100,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: `none`,
            display: `grid`,
            gridTemplateRows: `1.5rem 1.5rem`,
            gridTemplateColumns: `3rem auto`,
            columnGap: `0.25rem`,
          }}
        >
          <div style={{ gridArea: `1 / 1 / 3 / 2` }}>
            <Image filename="logo.png" alt={`${shortname} logo`} />
          </div>
          {shortname}
          <b>{siteTitle}</b>
        </Link>
      </div>
      <div style={{ display: `flex` }}>{children}</div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default Header
