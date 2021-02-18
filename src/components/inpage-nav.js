import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { FeedbackForm } from "feedback-fish"

import { CaseiLogoIcon } from "../icons"
import { colors } from "../utils/theme"
import Button from "../components/button"

// Note: the triggerComponent can be any component you want!
const FishButton = props => <Button action={props.onClick}>Feedback</Button>

FishButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const InpageLink = props => (
  <li
    css={`
      margin: 0 1rem 0 0;
    `}
  >
    <a
      href={`#${props.id}`}
      css={`
        color: ${colors.lightTheme.text};
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

const InpageNav = ({ shortname, items, path }) => (
  <div
    css={`
      position: sticky;
      top: 0;
      z-index: 1000;
    `}
    data-cy="inpage-nav"
  >
    <div
      css={`
        margin: 0 -6rem;
        padding: 0 6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${colors.lightTheme.background};
        color: ${colors.lightTheme.text};
      `}
    >
      <nav aria-label="inpage-scroll">
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
              <CaseiLogoIcon color={colors.lightTheme.text} size="tiny" />
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
                font-size: 2rem;
                color: ${colors.lightTheme.text};
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
      </nav>
      <FeedbackForm
        projectId="29092c37ced46e"
        triggerComponent={FishButton}
        metadata={{ path }}
      />
    </div>
  </div>
)

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
