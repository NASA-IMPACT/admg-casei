import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { colors, layout, breakpoints } from "../theme"
import { CaseiLogoIcon, CloseIcon } from "../icons"
import { FEEDBACK_FORM_URL, NEGATIVE, POSITIVE } from "../utils/constants"

import StickyBanner from "./sticky-banner"
import Button, { IconButton } from "./button"
import { Modal } from "./modal"
import styled from "styled-components"

const Component = styled.div`
  width: 25rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  max-height: 720px;
  border-radius: 3px;
  background: #f2f7fb;
  pointer-events: auto;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Header = ({ shortname, children, mode }) => {
  const offsetCalculator = (scrollDirection, _, currentScroll) => {
    if (scrollDirection === "scroll-down" && currentScroll > 250) {
      return `-${document.getElementById("main-header").clientHeight}px`
    } else {
      return 0
    }
  }

  const [hasSeenNotice, setHasSeenNotice] = useState(false)
  const [isModalOpen, setModal] = useState(false)

  // This runs when the page is loaded.
  useEffect(() => {
    if (localStorage.getItem("has_seen_notice")) {
      setHasSeenNotice(true)
    }
  }, [])

  const markReleaseNoticeSeen = () => {
    localStorage.setItem("has_seen_notice", "true")
    setHasSeenNotice(true)
    setModal(false)
  }

  const ModalBody = () => (
    <Component>
      <p>
        July 2023 Update! While CASEI has been publicly available in beta mode
        since 2021, there is now a majority (65%) of known NASA airborne and
        field campaigns represented across the database and a unique range of
        search/browse functionality built into CASEI and its API.
      </p>
      <br />
      <p>
        As you explore CASEI in this full-release version, keep in mind that
        additional campaigns, platforms, instruments, and data products are
        still being curated. We welcome
        <button
          css={`
            background: none;
            color: inherit;
            border: none;
            padding: 0 0 0 4px;
            font: inherit;
            cursor: pointer;
            outline: inherit;
            text-transform: lowercase;
            text-decoration: underline;
            &:hover {
              opacity: 0.8;
            }
          `}
          onClick={() => {
            markReleaseNoticeSeen()
            window.open(FEEDBACK_FORM_URL, "_blank")
          }}
        >
          your feedback
        </button>
        !
      </p>
      <br />
      <Button action={markReleaseNoticeSeen}>okay</Button>
    </Component>
  )

  return (
    <StickyBanner offsetCalculator={offsetCalculator}>
      <header
        id="main-header"
        css={`
          z-index: 3;
          background-color: ${colors[mode].background};
          box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
            rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
        `}
      >
        <div
          css={`
            position: absolute;
            background: #ebba33;
            color: ${colors[POSITIVE].text};
            opacity: 0.95;
            width: 100%;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            z-index: 400;
            display: ${hasSeenNotice ? "none" : "flex"};
          `}
        >
          {`July 2023 Update! While CASEI has been publicly available in beta mode
          since 2021, we are launching our `}
          <button
            css={`
              background: none;
              color: inherit;
              border: none;
              padding: 0 0 0 4px;
              font: inherit;
              cursor: pointer;
              outline: inherit;
              text-transform: lowercase;
              text-decoration: underline;
              &:hover {
                opacity: 0.8;
              }
            `}
            onClick={() => {
              setModal(true)
            }}
          >
            {" "}
            full-release version
          </button>
          <IconButton
            id="remove-filter"
            action={markReleaseNoticeSeen}
            icon={<CloseIcon color={colors[POSITIVE].text} />}
          />
        </div>
        <Modal
          id="modal"
          isOpen={isModalOpen}
          handleClose={() => setModal(false)}
          Custom={ModalBody}
        ></Modal>
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
    </StickyBanner>
  )
}

Header.propTypes = {
  shortname: PropTypes.string.isRequired,
  children: PropTypes.element,
  mode: PropTypes.string.isRequired,
}

export default Header
