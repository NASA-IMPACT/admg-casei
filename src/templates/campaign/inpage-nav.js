import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

const InpageLink = props => (
  <li style={{ margin: `0 1rem 0 0` }}>
    <a href={props.to}>{props.children}</a>
  </li>
)

InpageLink.propTypes = {
  to: function (props, propName, componentName) {
    // validate that prop `to` links to an existing section
    if (
      !/(#overview|#focus|#platforms|#platforms|#timeline|#data|#program-info)/.test(
        props[propName]
      )
    ) {
      return new Error(
        "Invalid prop `" +
          propName +
          "` supplied to" +
          " `" +
          componentName +
          "`. Validation failed."
      )
    }
  },
  children: PropTypes.string.isRequired,
}

const InpageNav = () => (
  <div
    style={{
      position: `sticky`,
      top: `0`,
      display: `flex`,
      padding: `1rem 5rem`,
      margin: `0 -5rem`,
      borderTop: `1px solid #9E9E9E`,
      borderBottom: `1px solid #9E9E9E`,
      justifyContent: `space-between`,
      alignItems: `center`,
      backgroundColor: theme.color.primary,
      zIndex: 1000,
    }}
  >
    <nav aria-label="inpage-scroll">
      <ul
        style={{
          display: `flex`,
          flexDirection: `row`,
          justifyContent: `flex-start`,
          margin: 0,
          listStyle: `none`,
        }}
      >
        <InpageLink to="#overview">Overview</InpageLink>
        <InpageLink to="#focus">Focus</InpageLink>
        <InpageLink to="#platforms">Platforms</InpageLink>
        <InpageLink to="#platforms">Instruments</InpageLink>
        <InpageLink to="#timeline">Timeline</InpageLink>
        <InpageLink to="#data">Data</InpageLink>
        <InpageLink to="#program-info">Program Info</InpageLink>
      </ul>
    </nav>
    <div style={{ display: `flex` }}>
      <div style={{ padding: `0 1rem` }}>
        <a>💬 Submit Feedback</a>
      </div>
      <div style={{ padding: `0 1rem` }}>
        <a>📤 Share</a>
      </div>
    </div>
  </div>
)

export default InpageNav
