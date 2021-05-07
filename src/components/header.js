import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { colors, layout } from "../theme"
import { CaseiLogoIcon } from "../icons"
import { NEGATIVE } from "../utils/constants"

const Header = ({ shortname, children, mode, isHeaderFixed }) => (
  <header
    css={`
      background-color: ${colors[mode].background};
      z-index: 99;
      position: ${isHeaderFixed ? "inherit" : "sticky"};
      top: 0;
      box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
        rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
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
          display: flex;
          align-items: center;
          gap: 1rem;
        `}
      >
        <StaticImage
          src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png"
          alt="NASA's red, white and blue insignia, nicknamed the 'meatball'"
          width={78} // make the blue circle match the svg logo of size 60
          height={78} // make the blue circle match the svg logo of size 60
          data-cy="nasa-logo"
        />

        <div
          css={`
            background-color: ${colors[NEGATIVE].text};
            height: 1.5rem;
            width: 1px;
          `}
        />

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
  isHeaderFixed: PropTypes.bool,
}

export default Header
