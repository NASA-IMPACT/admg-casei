import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

const InpageLink = props => (
  <li style={{ margin: `0 1rem 0 0` }}>
    <a href={props.to} data-cy={`${props.dataCy}-inpage-link`}>
      {props.children}
    </a>
  </li>
)

InpageLink.propTypes = {
  dataCy: PropTypes.string.isRequired,
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
      <div style={{ display: `flex`, alignItems: `center` }}>
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
            <InpageLink dataCy="overview" to="#overview">
              Overview
            </InpageLink>
            <InpageLink dataCy="focus" to="#focus">
              Focus
            </InpageLink>
            <InpageLink dataCy="platform" to="#platform">
              Platforms
            </InpageLink>
            <InpageLink dataCy="intruments" to="#platform">
              Instruments
            </InpageLink>
            <InpageLink dataCy="timeline" to="#timeline">
              Timeline
            </InpageLink>
            <InpageLink dataCy="program-info" to="#program-info">
              Program Info
            </InpageLink>
          </ul>
        </nav>
      </div>
      <div style={{ display: `flex` }}>
        <div style={{ padding: `0 1rem` }}>
          <a>💬 Submit Feedback</a>
        </div>
        <div style={{ padding: `0 1rem` }}>
          <a>📤 Share</a>
        </div>
      </div>
    </div>
  </div>
)

InpageNav.propTypes = {
  shortname: PropTypes.string.isRequired,
}

export default InpageNav
