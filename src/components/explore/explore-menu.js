import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const ListLink = props => {
  return (
    <li style={{ margin: `0 1rem 0 0` }}>
      <Link
        to={props.to}
        activeStyle={{
          color: `#AAC9FF`,
          fontWeight: `bold`,
        }}
        partiallyActive={true}
      >
        {props.children}
      </Link>
    </li>
  )
}

ListLink.propTypes = {
  to: function (props, propName, componentName) {
    // validate that prop `to` links to an existing page
    if (!/\/explore\/(campaigns|platforms|instruments)/.test(props[propName])) {
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

const ExploreMenu = () => (
  <>
    <div
      style={{
        display: `flex`,
        justifyContent: `space-around`,
        marginBottom: `2rem`,
      }}
    >
      <ul
        style={{
          display: `flex`,
          flexDirection: `row`,
          margin: 0,
          listStyle: `none`,
          alignItems: "center",
        }}
        data-cy="tabbar"
      >
        <ListLink to="/explore/campaigns">Campaigns</ListLink>
        <ListLink to="/explore/platforms">Platforms</ListLink>
        <ListLink to="/explore/instruments">Instruments</ListLink>
      </ul>
    </div>
  </>
)

export default ExploreMenu
