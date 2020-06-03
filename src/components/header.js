import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Image from "./image"

const Header = ({ siteTitle, children }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
      }}
    >
      <div
        style={{
          margin: 0,
          fontFamily: `'Varela Round',sans-serif`,
          fontSize: `1.5rem`,
          lineHeight: `1.5rem`,
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
            <Image filename="logo.png" alt={`${siteTitle} logo`} />
          </div>
          NASA
          <b>{siteTitle}</b>
        </Link>
      </div>
      {children}
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
