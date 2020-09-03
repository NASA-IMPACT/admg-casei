import React from "react"
import PropTypes from "prop-types"
import { FeedbackForm } from "feedback-fish"

import theme from "../utils/theme"

// Note: the triggerComponent can be any component you want!
// Don't forget to spread the passed props though: {...props}
const Button = props => <button {...props}>Feedback</button>

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

const InpageNav = ({ shortname, items }) => (
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
            listStyle: `none`,
          }}
        >
          <li>
            <h1 style={{ paddingRight: `1rem` }}>
              <a href="#top" data-cy={`top-inpage-link`}>
                {shortname}
              </a>
            </h1>
          </li>
          {items.map(item => (
            <InpageLink key={item.id} id={item.id}>
              {item.label}
            </InpageLink>
          ))}
        </ul>
      </nav>
      <FeedbackForm projectId="29092c37ced46e" triggerComponent={Button} />
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
}

export default InpageNav
