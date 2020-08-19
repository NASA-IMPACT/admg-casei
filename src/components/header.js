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
        padding: `2rem ${theme.layout.pageMargin}`,
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
            columnGap: `1rem`,
          }}
        >
          <div style={{ gridArea: `1 / 1 / 3 / 2` }}>
            <Image filename="logo.png" alt={`${shortname} logo`} />
          </div>
          {shortname}
          <p>{siteTitle}</p>
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
