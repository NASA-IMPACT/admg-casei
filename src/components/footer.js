import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

import theme from "../utils/theme"
import Login from "./login"
import ExternalLink from "./external-link"

const Ul = styled.ul`
  list-style: none;
  margin: 0;
`
const Headline = styled.p`
  margin: 0 0 1.5rem 0;
  font-weight: bold;
  line-height: 3rem;
`

const Footer = ({ shortname }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <footer
      css={`
        margin-top: 5rem;
        background-color: #262a31;
      `}
      data-cy="page-footer"
    >
      <div
        css={`
          margin: 5rem auto;
          max-width: theme.layout.maxWidth;
          padding: 2rem ${theme.layout.pageMargin};
          flex-shrink: 0;
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(12, 1fr);
        `}
      >
        <div
          css={`
            grid-column: 1 / span 3;
          `}
        >
          <div
            css={`
              text-transform: uppercase;
              font-weight: 900;
              font-size: 30px;
              line-height: 2.5rem;
              margin-bottom: 0.5rem;
            `}
            data-cy="footer-title"
          >
            {shortname}
          </div>
          <p data-cy="footer-subtitle">
            {shortname} is a comprehensive inventory containing information
            about all airborne and field campaigns as well as aircrafts,
            instruments, and data products.
          </p>
        </div>

        <div
          css={`
            grid-column: 5 / span 2;
          `}
          data-cy="footer-explore"
        >
          <Headline>Explore</Headline>
          <Ul>
            <li>
              <Link to="/explore" data-cy="footer-campaigns-link">
                Campaigns
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                state={{ defaultExploreCategory: "platforms" }}
                data-cy="footer-platforms-link"
              >
                Platforms
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                state={{ defaultExploreCategory: "instruments" }}
                data-cy="footer-instruments-link"
              >
                Instruments
              </Link>
            </li>
          </Ul>
        </div>

        <div
          css={`
            grid-column: 7 / span 2;
          `}
          data-cy="footer-resources"
        >
          <Headline>Resources</Headline>
          <Ul>
            <li>
              <Link to="/glossary/">Glossary</Link>
            </li>
            <li>
              {isClient && (
                // the login button is only visible for the client (the browser), not in ssr
                <Login />
              )}
            </li>
          </Ul>
        </div>

        <div
          css={`
            grid-column: 9 / span 2;
          `}
          data-cy="footer-quick-links"
        >
          <Headline>Quick Links</Headline>
          <Ul>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/contact/">Contact us</Link>
            </li>
          </Ul>
        </div>

        <div
          css={`
            grid-column: 11 / span 2;
          `}
          data-cy="footer-organizations"
        >
          <Headline>Organizations</Headline>
          <Ul>
            <li>
              <ExternalLink
                label="ADMG Website"
                url="https://earthdata.nasa.gov/esds/impact/admg"
                id="admg-website"
              />
            </li>
            <li>
              <ExternalLink
                label="Impact Website"
                url="https://earthdata.nasa.gov/esds/impact"
                id="impact-website"
              />
            </li>
          </Ul>
        </div>

        <hr
          css={`
            grid-column: 1 / span 12;
            background-color: rgba(255, 255, 255, 0.2);
          `}
        />

        <div
          css={`
            grid-column: 1 / span 12;
            display: flex;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              font-weight: bold;
            `}
          >
            <div
              css={`
                background-image: url("https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png");
                background-size: cover;
                background-position: center;
                width: 100;
                height: 100;
              `}
            ></div>
            <div data-cy="footer-credits">
              <div data-cy="footer-credit-org">
                National Aeronautics and Space Administration
              </div>
              <div data-cy="footer-credit-official">
                NASA Official:{" "}
                <span
                  css={`
                    font-weight: normal;
                  `}
                >
                  Rahul Ramachandran
                </span>
              </div>
            </div>
          </div>
          <div
            css={`
              display: flex;
              align-items: center;
              text-transform: uppercase;
              color: #81aefb;
              font-weight: bold;
            `}
          >
            {/* TODO: Add back in with real links */}
            {/* <div style={{ marginLeft: `3rem` }}>
              Privacy
            </div>
            <div style={{ marginLeft: `3rem` }}>
              Contact NASA
            </div> */}
          </div>
        </div>
      </div>

      <div
        css={`
          text-align: center;
        `}
        data-cy="footer-credit-devseed"
      >
        © {new Date().getFullYear()}, Built by{" "}
        <ExternalLink
          label="Development Seed"
          url="https://www.developmentseed.org"
          id="devseed-website"
        />
        .
      </div>
    </footer>
  )
}

Footer.propTypes = {
  shortname: PropTypes.string.isRequired,
}

export default Footer
