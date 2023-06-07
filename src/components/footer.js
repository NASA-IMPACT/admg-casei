import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { NEGATIVE } from "../utils/constants"
import { colors, layout } from "../theme"
import ExternalLink from "./external-link"
import { API_DOCUMENTATION_URL } from "../utils/constants"

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
  return (
    <footer
      css={`
        margin-top: 5rem;
        background-color: ${colors[NEGATIVE].background};
      `}
      data-cy="page-footer"
    >
      <div
        css={`
          margin: 5rem auto;
          max-width: ${layout.maxWidth};
          padding: 2rem ${layout.pageMargin};
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
              <Link to="/explore/campaigns" data-cy="footer-campaigns-link">
                Campaigns
              </Link>
            </li>
            <li>
              <Link to="/explore/platforms" data-cy="footer-platforms-link">
                Platforms
              </Link>
            </li>
            <li>
              <Link to="/explore/instruments" data-cy="footer-instruments-link">
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
            <li>
              {/* eslint-disable-next-line prettier/prettier  */}
              <ExternalLink
                url={API_DOCUMENTATION_URL}
                target="_blank"
                label="API Documentation"
                id="api documentation"
              >
                API Documentation
              </ExternalLink>
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
                label="IMPACT Website"
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
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.nasa.gov"
              aria-label="Visit nasa.gov (opens in a new window)"
            >
              <StaticImage
                src="https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png"
                alt="NASA's red, white and blue insignia, nicknamed the 'meatball'"
                width={100} // make the blue circle match the svg logo of size 60
                height={100} // make the blue circle match the svg logo of size 60
                data-cy="nasa-logo-footer"
              />
            </a>
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
