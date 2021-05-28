import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { CaseiLogoIcon } from "../icons"
import { POSITIVE } from "../utils/constants"
import { colors, breakpoints } from "../theme"
import Button from "../components/button"

const InpageLink = props => (
  <li
    css={`
      margin: 0 1rem 0 0;
      width: fit-content;
    `}
  >
    <a
      href={`#${props.id}`}
      css={`
        color: ${colors[POSITIVE].text};
        font-weight: 600;
      `}
      data-cy={`${props.id}-inpage-link`}
    >
      {props.children}
    </a>
  </li>
)

InpageLink.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

const InpageNav = ({ shortname, items }) => {
  const [isFBMLoaded, setIsFBMLoaded] = useState(false)

  useEffect(() => {
    //ensure that feedback module is loaded and inititalized (external script)
    if (window.feedback) {
      if (!window.feedback.showForm) {
        window.feedback.init({ showIcon: false })
      }
      setIsFBMLoaded(true)
    }
  }, [])

  return (
    <div
      css={`
        position: sticky;
        top: 0;
        z-index: 1000;
      `}
      data-cy="inpage-nav"
    >
      <nav
        aria-label="inpage-scroll"
        css={`
          margin: 0 -6rem;
          padding: 0 6rem;
          @media screen and (max-width: ${breakpoints["sm"]}) {
            padding: 0 2.5rem;
          }
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: ${colors[POSITIVE].background};
          color: ${colors[POSITIVE].text};
        `}
        data-cy="inpage-nav"
      >
        <ul
          css={`
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            margin: 0;
            padding: 0.25rem 0;
            list-style: none;
          `}
        >
          <li>
            <Link
              to="/"
              css={`
                text-decoration: none;
                display: grid;
                grid-template-columns: 3rem auto;
                align-items: center;
              `}
              data-cy="home-link"
            >
              <CaseiLogoIcon color={colors[POSITIVE].text} size="tiny" />
            </Link>
          </li>
          <li
            css={`
              margin: 0 1rem 0 0;
            `}
          >
            <a
              href="#top"
              css={`
                padding-right: 1rem;
                @media screen and (max-width: ${breakpoints["sm"]}) {
                  padding-right: 0;
                }
                font-size: 2rem;
                color: ${colors[POSITIVE].text};
              `}
              data-cy={`top-inpage-link`}
            >
              {shortname}
            </a>
          </li>
          {items.map(item => (
            <InpageLink key={item.id} id={item.id}>
              {item.label}
            </InpageLink>
          ))}
        </ul>
        {isFBMLoaded && (
          <Button
            action={() => {
              window.feedback.showForm()
            }}
            mode={POSITIVE}
          >
            Feedback
          </Button>
        )}
      </nav>
    </div>
  )
}

InpageNav.propTypes = {
  shortname: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  path: PropTypes.string.isRequired,
}

export default InpageNav
