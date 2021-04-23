import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { layout, colors } from "../theme"
import { CaseiLogoIcon } from "../icons"

const Header = ({ shortname, children, mode }) => (
  <header
    css={`
      background-color: ${colors[mode].background};
      z-index: 1;
    `}
  >
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
          <CaseiLogoIcon size="small" color={colors[mode].text} />
          <div
            css={`
              font-size: 1.5rem;
              color: ${colors[mode].text};
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
  mode: PropTypes.string.isRequired,
}

export default Header
