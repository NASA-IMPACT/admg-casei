import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

const InpageLink = props => (
  <li style={{ margin: `0 1rem 0 0` }}>
    <a href={props.to} data-cy={`${props.id}-inpage-link`}>
      {props.children}
    </a>
  </li>
)

InpageLink.propTypes = {
  id: PropTypes.string.isRequired,
  to: function (props, propName, componentName) {
    // validate that prop `to` links to an existing section
    if (
      !/(#overview|#focus|#platform|#timeline|#program-info)/.test(
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

const InpageNav = ({ shortname }) => (
  <div
    style={{
      position: `sticky`,
      top: `0`,
      display: `flex`,
      padding: `1rem ${theme.layout.pageMargin}`,
      margin: `0 -${theme.layout.pageMargin}`,
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
          alignItems: `center`,
          margin: 0,
          listStyle: `none`,
        }}
      >
        <h3 style={{ paddingRight: `1rem` }}>{shortname}</h3>
        <InpageLink id="overview" to="#overview">
          Overview
        </InpageLink>
        <InpageLink id="focus" to="#focus">
          Focus
        </InpageLink>
        <InpageLink id="platform" to="#platform">
          Platforms
        </InpageLink>
        <InpageLink id="intruments" to="#platform">
          Instruments
        </InpageLink>
        <InpageLink id="timeline" to="#timeline">
          Timeline
        </InpageLink>
        <InpageLink id="program-info" to="#program-info">
          Program Info
        </InpageLink>
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

InpageNav.propTypes = {
  shortname: PropTypes.string.isRequired,
}

export default InpageNav
