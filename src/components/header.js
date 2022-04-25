import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { colors, layout, breakpoints } from "../theme"
import { CaseiLogoIcon } from "../icons"
import { NEGATIVE } from "../utils/constants"

const Header = ({ shortname, children, mode }) => {
  const scrollDown = "scroll-down"
  const scrollUp = "scroll-up"
  const [scrollDirection, setScrollDirection] = useState(null)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler)
    return () => {
      window.removeEventListener("scroll", scrollHandler)
    }
  })

  const scrollHandler = () => {
    const currentScroll = window.scrollY
    if (currentScroll > lastScroll && currentScroll > 250) {
      setScrollDirection(scrollDown)
    } else if (currentScroll < lastScroll) {
      setScrollDirection(scrollUp)
    }
    setLastScroll(currentScroll)
  }

  return (
    <header
      id="main-header"
      css={`
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 3;
        transition: transform 0.2s;
        transform: ${scrollDirection == scrollDown
          ? "translate3d(0, -120%, 0)"
          : "none"};
        background-color: ${colors[mode].background};
        box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
          rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
      `}
    >
      <div
        css={`
          margin: 0 auto;
          max-width: ${layout.maxWidth};
          padding: 0.25rem ${layout.pageMargin};
          @media screen and (max-width: ${breakpoints["sm"]}) {
            padding: 0.25rem ${layout.smallPageMargin};
          }
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.nasa.gov"
            aria-label="Visit nasa.gov (opens in a new window)"
          >
            <StaticImage
              src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png"
              alt="NASA's red, white and blue insignia, nicknamed the 'meatball'"
              width={78} // make the blue circle match the svg logo of size 60
              height={78} // make the blue circle match the svg logo of size 60
              data-cy="nasa-logo"
            />
          </a>

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
}

Header.propTypes = {
  shortname: PropTypes.string.isRequired,
  children: PropTypes.element,
  mode: PropTypes.string.isRequired,
}

export default Header
