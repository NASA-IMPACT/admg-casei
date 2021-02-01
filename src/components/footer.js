import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import theme from "../utils/theme"
import Login from "./login"
import ExternalLink from "./external-link"
import { Heading2, SmallTitles, BodyText, LinkText } from "../theme/typography"

const Footer = ({ shortname }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const style = {
    ul: {
      listStyle: `none`,
      margin: 0,
    },
  }

  return (
    <footer style={{ marginTop: `5rem`, backgroundColor: `#262A31` }}>
      <div
        style={{
          margin: `5rem auto`,
          maxWidth: theme.layout.maxWidth,
          padding: `2rem ${theme.layout.pageMargin}`,
          flexShrink: 0,
          display: `grid`,
          gap: `1rem`,
          gridTemplateColumns: `repeat(12, 1fr)`,
        }}
      >
        <div style={{ gridColumn: `1 / span 3` }}>
          <Heading2>{shortname}</Heading2>
          <BodyText>
            {shortname} is a comprehensive inventory containing information
            about all airborne and field campaigns as well as aircrafts,
            instruments, and data products.
          </BodyText>
        </div>

        <div style={{ gridColumn: `5 / span 2` }}>
          <BodyText>Explore</BodyText>
          <ul style={style.ul}>
            <li>
              <Link to="/explore">
                <LinkText as="span">Campaigns</LinkText>
              </Link>
              {/** TODO: link to explore with tab selected */}
            </li>
            <li>
              <Link to="/explore">
                <LinkText as="span">Platforms</LinkText>
              </Link>
              {/** TODO: link to explore with tab selected */}
            </li>
            <li>
              <Link to="/explore">
                <LinkText as="span">Instruments</LinkText>
              </Link>
              {/** TODO: link to explore with tab selected */}
            </li>
          </ul>
        </div>

        <div style={{ gridColumn: `7 / span 2` }}>
          <BodyText>Resources</BodyText>
          <ul style={style.ul}>
            <li>
              <Link to="/glossary/">
                <LinkText as="span">Glossary</LinkText>
              </Link>
            </li>
            <li>
              {isClient && (
                // the login button is only visible for the client (the browser), not in ssr
                <Login />
              )}
            </li>
          </ul>
        </div>

        <div style={{ gridColumn: `9 / span 2` }}>
          <BodyText>Quick Links</BodyText>
          <ul style={style.ul}>
            <li>
              <Link to="/about/">
                <LinkText as="span">About</LinkText>
              </Link>
            </li>
            <li>
              <Link to="/contact/">
                <LinkText as="span">Contact us</LinkText>
              </Link>
            </li>
          </ul>
        </div>

        <div style={{ gridColumn: `11 / span 2` }}>
          <BodyText>Organizations</BodyText>
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
              <BodyText>National Aeronautics and Space Administration</BodyText>
              <SmallTitles>
                NASA Official:{" "}
                <span
                  style={{
                    fontWeight: `normal`,
                  }}
                >
                  Rahul Ramachandran
                </span>
              </SmallTitles>
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

      <BodyText style={{ textAlign: `center` }}>
        © {new Date().getFullYear()}, Built by{" "}
        <ExternalLink
          label="Development Seed"
          url="https://www.developmentseed.org"
          id="devseed-website"
        />
        .
      </BodyText>
    </footer>
  )
}

Footer.propTypes = {
  shortname: PropTypes.string.isRequired,
}

export default Footer
