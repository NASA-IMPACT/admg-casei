import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { layout } from "../theme"
import { CaseiLogoIcon } from "../icons"

const Header = ({ shortname, children }) => (
  <header>
    <div
      css={`
        margin: 0 auto;
        max-width: ${layout.maxWidth};
        padding: 1.5rem ${layout.pageMargin};
        display: flex;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={`
          margin: 0;
          z-index: 100;
        `}
      >
        <Link
          to="/"
          css={`
            text-decoration: none;
            display: grid;
            grid-template-columns: 3rem auto;
            column-gap: 2rem;
            align-items: center;
          `}
        >
          <CaseiLogoIcon size="small" />
          <div
            css={`
              font-size: 1.5rem;
            `}
          >
            {shortname}
          </div>
        </Link>
      </div>
      <div
        css={`
          display: flex;
        `}
      >
        {children}
      </div>
    </div>
  </header>
)

Header.propTypes = {
  shortname: PropTypes.string.isRequired,
  children: PropTypes.element,
}

export default Header
