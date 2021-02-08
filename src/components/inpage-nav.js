import React from "react"
import PropTypes from "prop-types"
import { FeedbackForm } from "feedback-fish"

import theme from "../utils/theme"
import Button from "../components/button"

// Note: the triggerComponent can be any component you want!
const FishButton = props => <Button action={props.onClick}>Feedback</Button>

FishButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const InpageLink = props => (
  <li style={{ margin: `0 1rem 0 0` }}>
    <a href={`#${props.id}`} data-cy={`${props.id}-inpage-link`}>
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
      borderBottom: `1px solid #9E9E9E`,
      backgroundColor: theme.color.primary,
      zIndex: 1000,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: theme.layout.maxWidth,
        padding: `0 ${theme.layout.pageMargin}`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
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
            <div style={{ paddingRight: `1rem`, fontSize: `2rem` }}>
              <a href="#top" data-cy={`top-inpage-link`}>
                {shortname}
              </a>
            </div>
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
