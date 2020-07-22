import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import theme from "../utils/theme"
import Login from "./login"
import ExternalLink from "./external-link"

const Footer = ({ shortname }) => {
  const style = {
    ul: {
      listStyle: `none`,
      margin: 0,
    },
    headline: {
      margin: `0 0 1.5rem 0`,
      fontWeight: `bold`,
      lineHeight: `3rem`,
    },
  }

  return (
    <footer style={{ marginTop: `5rem`, backgroundColor: `#262A31` }}>
      <div
        style={{
          margin: `5rem auto`,
          maxWidth: theme.layout.maxWidth,
          padding: `2rem 5rem`,
          flexShrink: 0,
          display: `grid`,
          gap: `1rem`,
          gridTemplateColumns: `repeat(12, 1fr)`,
        }}
      >
        <div style={{ gridColumn: `1 / span 3` }}>
          <div
            style={{
              textTransform: `uppercase`,
              fontWeight: `900`,
              fontSize: `30px`,
              lineHeight: `2.5rem`,
              marginBottom: `0.5rem`,
            }}
          >
            {shortname}
          </div>
          <p>
            {shortname} is a comprehensive inventory containing information
            about all airborne, field stationary and fixed earth science
            campaigns as well as aircrafts, instruments, and data products.
          </p>
        </div>

        <div style={{ gridColumn: `5 / span 2` }}>
          <p style={style.headline}>Explore</p>
          <ul style={style.ul}>
            <li>
              <Link to="/explore/campaigns">Campaigns</Link>
            </li>
            <li>
              <Link to="/explore/platforms">Platforms</Link>
            </li>
            <li>
              <Link to="/explore/instruments">Instruments</Link>
            </li>
          </ul>
        </div>

        <div style={{ gridColumn: `7 / span 2` }}>
          <p style={style.headline}>Resources</p>
          <ul style={style.ul}>
            <li>
              <Link to="/glossary/">Glossary</Link>
            </li>
            <li>
              <Login />
            </li>
          </ul>
        </div>

        <div style={{ gridColumn: `9 / span 2` }}>
          <p style={style.headline}>Quick Links</p>
          <ul style={style.ul}>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/contact/">Contact us</Link>
            </li>
          </ul>
        </div>

        <div style={{ gridColumn: `11 / span 2` }}>
          <p style={style.headline}>Organizations</p>
          <ul style={style.ul}>
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
          </ul>
        </div>

        <hr
          style={{
            gridColumn: `1 / span 12`,
            backgroundColor: `rgba(255,255,255,0.2)`,
          }}
        />

        <div
          style={{
            gridColumn: `1 / span 12`,
            display: `flex`,
            justifyContent: `space-between`,
          }}
        >
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
              fontWeight: `bold`,
            }}
          >
            <div
              style={{
                backgroundImage: `url('https://www.nasa.gov/sites/default/files/thumbnails/image/nasa-logo-web-rgb.png')`,
                backgroundSize: `cover`,
                backgroundPosition: `center`,
                width: 100,
                height: 100,
              }}
            ></div>
            <div>
              <div>National Aeronautics and Space Administration</div>
              <div>
                NASA Official:{" "}
                <span
                  className="placeholder"
                  style={{
                    fontWeight: `normal`,
                  }}
                >
                  Name of Official
                </span>
              </div>
            </div>
          </div>
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
              textTransform: `uppercase`,
              color: `#81AEFB`,
              fontWeight: `bold`,
            }}
          >
            <div className="placeholder" style={{ marginLeft: `3rem` }}>
              Privacy
            </div>
            <div className="placeholder" style={{ marginLeft: `3rem` }}>
              Contact NASA
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: `center` }}>
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
