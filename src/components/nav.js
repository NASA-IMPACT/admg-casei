import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { breakpoints, colors } from "../theme"
import { POSITIVE, NEGATIVE } from "../utils/constants"

const ListLink = ({ to, children, mode }) => (
  <li
    css={`
      margin: 0 1rem 0 0;
      text-transform: uppercase;
    `}
  >
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
    if (
      !/(\/explore|\/glossary|\/about|\/faq|\/contact)/.test(props[propName])
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
  mode: PropTypes.oneOf([POSITIVE, NEGATIVE]),
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

          @media screen and (max-width: ${breakpoints.sm}) {
            font-size: 14px;
          }
        `}
      >
        <ListLink to="/explore/campaigns" mode={mode}>
          Explore
        </ListLink>
        <ListLink to="/glossary" mode={mode}>
          Glossary
        </ListLink>
        <ListLink to="/about" mode={mode}>
          About
        </ListLink>
        <ListLink to="/faq" mode={mode}>
          FAQS
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
