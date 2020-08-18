import React from "react"
import PropTypes from "prop-types"
import { Link, navigate } from "gatsby"

import theme from "../utils/theme"

const ListLink = props => (
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

ListLink.propTypes = {
  to: function (props, propName, componentName) {
    // validate that prop `to` links to an existing page
    if (!/(\/explore|\/resources|\/about|\/contact)/.test(props[propName])) {
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

const Nav = () => {
  return (
    <nav style={{ zIndex: 100 }}>
      <ul
        style={{
          display: `flex`,
          flexDirection: `row`,
          justifyContent: `flex-end`,
          margin: 0,
          listStyle: `none`,
        }}
      >
        <ListLink to="/explore/campaigns">Explore</ListLink>
        <ListLink to="/glossary">Glossary</ListLink>
        <ListLink to="/about">About</ListLink>
        <ListLink to="/contact">Contact</ListLink>
      </ul>
    </nav>
  )
}

export default Nav
