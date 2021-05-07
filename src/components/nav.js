import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { colors } from "../theme"

const ListLink = ({ to, children, mode }) => (
  <li style={{ margin: `0 1rem 0 0`, textTransform: `uppercase` }}>
    <Link
      to={to}
      activeStyle={{
        borderBottom: `1px solid ${colors[mode].text}`,
        fontWeight: `bold`,
      }}
      css={`
        color: ${colors[mode].text};
      `}
      partiallyActive={true}
    >
      {children}
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
  mode: PropTypes.string.isRequired,
}

const Nav = ({ mode }) => {
  return (
    <nav
      css={`
        z-index: 100;
      `}
    >
      <ul
        css={`
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          margin: 0;
          list-style: none;
        `}
      >
        <ListLink to="/explore" mode={mode}>
          Explore
        </ListLink>
        <ListLink to="/glossary" mode={mode}>
          Glossary
        </ListLink>
        <ListLink to="/about" mode={mode}>
          About
        </ListLink>
        <ListLink to="/contact" mode={mode}>
          Contact
        </ListLink>
      </ul>
    </nav>
  )
}

export default Nav

Nav.propTypes = {
  mode: PropTypes.string.isRequired,
}
