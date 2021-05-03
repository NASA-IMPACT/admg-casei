import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { colors, layout } from "../theme"
import { CaseiLogoIcon } from "../icons"
import { NEGATIVE } from "../utils/constants"

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
