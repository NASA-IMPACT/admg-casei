import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { NEGATIVE } from "../utils/constants"
import { colors, layout, breakpoints } from "../theme"
import ExternalLink from "./external-link"
import { API_DOCUMENTATION_URL } from "../utils/constants"
import NasaLogoIcon from "../icons/nasa-logo"

const PageFooter = styled.footer`
  margin-top: 5rem;
  padding-bottom: 2rem;
  background-color: ${colors[NEGATIVE].background};
`
const PageFooterInner = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
  flex-wrap: nowrap;
  margin: 5rem auto 2rem;
  max-width: ${layout.maxWidth};
  padding: 2rem ${layout.smallPageMargin};
  @media screen and (min-width: ${breakpoints["sm"]}) {
    padding: 2rem ${layout.pageMargin};
    flex-shrink: 0;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem 3rem;
  }
  & > div {
    flex: 1;
    min-width: fit-content;
    &:first-child {
      flex: 2;
      padding-right: 2rem;
      min-width: 19rem;
    }
  }
  & > hr {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.2);
  }
`
const FooterSectionNavList = styled.ul`
  list-style: none;
  margin: 0;
`
const Headline = styled.p`
  font-weight: bold;
  line-height: 3rem;
  margin: 0;
  @media screen and (min-width: ${breakpoints["sm"]}) {
    margin-bottom: 1.5rem;
  }
`

const Footer = ({ shortname }) => {
  return (
    <PageFooter data-cy="page-footer">
      <PageFooterInner>
        <div>
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
            {`CASEI is a comprehensive inventory of holistic contextual
            information for NASA's Earth Science airborne and field campaigns,
            including details on instruments, aircraft and other platforms, and
            access to data products.`}
          </p>
        </div>

        <div data-cy="footer-explore">
          <Headline>Explore</Headline>
          <FooterSectionNavList>
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
            <li
              css={`
                padding-top: 0.5rem;
                font-size: 0.875rem;
                opacity: 0.75;
              `}
            >
              <Link to="/explore/upcoming" data-cy="footer-coming-soon-link">
                Coming Soon
              </Link>
            </li>
          </FooterSectionNavList>
        </div>

        <div>
          <Headline>Resources</Headline>
          <FooterSectionNavList>
            <li>
              <Link to="/glossary/">Glossary</Link>
            </li>
          </FooterSectionNavList>
        </div>

        <div data-cy="footer-quick-links">
          <Headline>Quick Links</Headline>
          <FooterSectionNavList>
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
          </FooterSectionNavList>
        </div>

        <div data-cy="footer-organizations">
          <Headline>Organizations</Headline>
          <FooterSectionNavList>
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
          </FooterSectionNavList>
        </div>

        <hr />

        <div
          css={`
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
              css={`
                svg {
                  height: 100px;
                  width: 100px;
                }
              `}
            >
              <NasaLogoIcon data-cy="nasa-logo-footer" />
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
      </PageFooterInner>

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
    </PageFooter>
  )
}

Footer.propTypes = {
  shortname: PropTypes.string.isRequired,
}

export default Footer
