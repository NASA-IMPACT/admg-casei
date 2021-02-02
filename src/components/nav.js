import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import theme from "../utils/theme"
import { ButtonText } from "../theme/typography"

const ListLink = props => (
  <li style={{ margin: `0 1rem 0 0` }}>
    <Link
      to={props.to}
      activeStyle={{
        color: theme.color.link,
        fontWeight: `bold`,
      }}
      partiallyActive={true}
    >
      <ButtonText>{props.children}</ButtonText>
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
