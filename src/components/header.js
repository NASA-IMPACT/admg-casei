import React, { useState } from "react"
import PropTypes from "prop-types"
import styled, { css, keyframes, createGlobalStyle } from "styled-components"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { colors, layout, breakpoints } from "../theme"
import { CaseiLogoIcon, CloseIcon, HamburgerIcon } from "../icons"
import { NEGATIVE } from "../utils/constants"
import StickyBanner from "./sticky-banner"
import Button from "./button"

const reveal = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`
const PageHeaderSelf = styled.header`
  z-index: 3;
  background-color: ${({ mode }) => mode && colors[mode].background};
  box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
    rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
  animation: ${reveal} 0.32s ease 0s 1;
`

const PageHeaderInner = styled.div`
  margin: 0 auto;
  max-width: ${layout.maxWidth};
  padding: 0.25rem ${layout.pageMargin};
  @media screen and (max-width: ${breakpoints["sm"]}) {
    padding: 0.75rem ${layout.smallPageMargin};
  }
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  z-index: 30;
  /* Animation */
  animation: ${reveal} 0.32s ease 0s 1;
  &::before {
    position: absolute;
    z-index: 40;
    top: 0;
    left: 0;
    width: 100%;
    height: 4.5rem;
    content: "";
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 75%,
      rgba(255, 255, 255, 1) 100%
    );
    @media screen and (min-width: ${breakpoints["sm"]}) {
      display: none;
    }
  }
`
const PageNavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 20;
  display: flex;
  flex-flow: column nowrap;
  padding: 5rem 1rem 1rem;
  overflow: auto;
  pointer-events: auto;
  background-color: ${({ mode }) => mode && colors[mode].background};
  transform: translate(0, -100%);
  margin: 0;
  transition: all 0.4s ease-in-out 0s;
  will-change: transform;
  box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
    rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
  ${({ revealed }) =>
    revealed &&
    css`
      transform: translate(0, 0);
    `};
  @media screen and (min-width: ${breakpoints["sm"]}) {
    margin-left: auto;
    position: static;
    flex-flow: row nowrap;
    padding: 0;
    overflow: visible;
    transform: translate(0, 0);
    justify-content: space-between;
    box-shadow: none;
  }
`
const BrandImageLink = styled.a`
  height: ${({ isMediumDown }) => (isMediumDown ? "2rem" : "78px")};
  width: ${({ isMediumDown }) => (isMediumDown ? "2rem" : "78px")};
`

const PageNavToggleWrapper = styled.div`
  position: relative;
  z-index: 50;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  @media screen and (min-width: ${breakpoints["sm"]}) {
    display: none;
  }
`
const PageNavToggle = styled(Button)``

const PageNavGlobalStyle = createGlobalStyle`
  body {
    ${({ isActive }) =>
      isActive &&
      css`
        overflow: hidden;
      `}
  }
`

const Header = ({ shortname, children, mode, isMediumDown = false }) => {
  const offsetCalculator = (scrollDirection, _, currentScroll) => {
    if (scrollDirection === "scroll-down" && currentScroll > 250) {
      return `-${document.getElementById("main-header").clientHeight}px`
    } else {
      return 0
    }
  }
  console.log(isMediumDown)
  const [navRevealed, setNavRevealed] = useState(false)
  return (
    <StickyBanner
      offsetCalculator={offsetCalculator}
      isMediumDown={isMediumDown}
      navRevealed={navRevealed}
    >
      <PageHeaderSelf id="main-header" mode={mode}>
        <PageHeaderInner isMediumDown={isMediumDown}>
          <div
            css={`
              margin: 0;
              z-index: 100;
              display: flex;
              align-items: center;
              gap: ${isMediumDown ? "0.5rem" : "1rem"};
            `}
          >
            <BrandImageLink
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.nasa.gov"
              aria-label="Visit nasa.gov (opens in a new window)"
              isMediumDown={isMediumDown}
            >
              <StaticImage
                src="../images/nasa-logo-web-rgb.png"
                alt="NASA's red, white and blue insignia, nicknamed the 'meatball'"
                width={78} // make the blue circle match the svg logo of size 60
                height={78} // make the blue circle match the svg logo of size 60
                data-cy="nasa-logo"
              />
            </BrandImageLink>

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
                grid-template-columns: max-content auto;
                column-gap: ${isMediumDown ? "0.5rem" : "1rem"};
                align-items: center;
              `}
            >
              <CaseiLogoIcon
                size={isMediumDown ? "tiny" : "small"}
                color={colors[mode].text}
              />
              <div
                css={`
                  font-size: ${isMediumDown ? "1.25rem" : "1.5rem"};
                  color: ${colors[mode].text};
                `}
              >
                {shortname}
              </div>
            </Link>
          </div>
          <PageNavGlobalStyle isActive={navRevealed} />
          <PageNavToggleWrapper>
            <PageNavToggle
              title="Reveal/hide menu"
              action={() => setNavRevealed(v => !v)}
              iconOnly
              noBorder
            >
              {navRevealed ? (
                <CloseIcon size="text" color={colors[mode].text} />
              ) : (
                <HamburgerIcon size="text" color={colors[mode].text} />
              )}
            </PageNavToggle>
          </PageNavToggleWrapper>
          <PageNavWrapper
            mode={mode}
            as="nav"
            role="navigation"
            revealed={navRevealed}
          >
            {children}
          </PageNavWrapper>
        </PageHeaderInner>
      </PageHeaderSelf>
    </StickyBanner>
  )
}

Header.propTypes = {
  shortname: PropTypes.string.isRequired,
  children: PropTypes.element,
  mode: PropTypes.string.isRequired,
  isMediumDown: PropTypes.bool.isRequired,
}

export default Header
