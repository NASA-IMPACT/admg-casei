import React from "react"
import PropTypes from "prop-types"
import { FeedbackForm } from "feedback-fish"

import { colors } from "../utils/theme"
import Button from "../components/button"

// Note: the triggerComponent can be any component you want!
const FishButton = props => <Button action={props.onClick}>Feedback</Button>

FishButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const InpageLink = props => (
  <li style={{ margin: `0 1rem 0 0` }}>
    <a
      href={`#${props.id}`}
      style={{ color: colors.lightTheme.text, fontWeight: 600 }}
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
    style={{
      position: `sticky`,
      top: 0,
      zIndex: 1000,
    }}
  >
    <div
      style={{
        margin: `0 -6rem`,
        padding: `0 6rem`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        backgroundColor: colors.lightTheme.background,
        color: colors.lightTheme.text,
      }}
    >
      <nav aria-label="inpage-scroll">
        <ul
          style={{
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `flex-start`,
            alignItems: `center`,
            margin: 0,
            padding: `0.25rem 0`,
            listStyle: `none`,
          }}
        >
          <li style={{ margin: `0 1rem 0 0` }}>
            <a
              href="#top"
              style={{
                paddingRight: `1rem`,
                fontSize: `2rem`,
                color: colors.lightTheme.text,
              }}
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
