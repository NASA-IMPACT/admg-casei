import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { NEGATIVE } from "../utils/constants"
import { colors } from "../utils/theme"

const ListLink = props => (
  <li style={{ margin: `0 1rem 0 0`, textTransform: `uppercase` }}>
    <Link
      to={props.to}
      activeStyle={{
        borderBottom: `1px solid ${colors[NEGATIVE].text}`,
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
    if (!/(\/explore|\/glossary|\/about|\/contact)/.test(props[propName])) {
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
        <ListLink to="/explore">Explore</ListLink>
        <ListLink to="/glossary">Glossary</ListLink>
        <ListLink to="/about">About</ListLink>
        <ListLink to="/contact">Contact</ListLink>
      </ul>
    </nav>
  )
}

export default Nav
