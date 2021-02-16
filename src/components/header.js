import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Image from "./image"
import { layout } from "../utils/theme"

const Header = ({ shortname, children }) => (
  <header>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: layout.maxWidth,
        padding: `2rem ${layout.pageMargin}`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
      }}
    >
      <div
        style={{
          margin: 0,
          zIndex: 100,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: `none`,
            display: `grid`,
            gridTemplateColumns: `3rem auto`,
            columnGap: `1rem`,
            alignItems: `center`,
          }}
        >
          <Image filename="logo.png" alt={`${shortname} logo`} />
          <div style={{ fontSize: `1.5rem` }}>{shortname}</div>
        </Link>
      </div>
      <div style={{ display: `flex` }}>{children}</div>
    </div>
  </header>
)

Header.propTypes = {
  shortname: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default Header
