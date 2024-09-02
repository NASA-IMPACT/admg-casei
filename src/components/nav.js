import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { colors, breakpoints } from "../theme"
import { POSITIVE, NEGATIVE } from "../utils/constants"

const GlobalMenu = styled.ul`
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  margin-left: 1rem;
  list-style: none;
  @media screen and (min-width: ${breakpoints["sm"]}) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0;
    list-style: none;
    flex-flow: row nowrap;
  }
`
const ListLink = ({ to, children, mode }) => (
  <li
    css={`
      margin: 0;
      text-transform: uppercase;
      @media screen and (min-width: ${breakpoints["sm"]}) {
        margin-left: 0.5rem;
      }
      @media screen and (min-width: ${breakpoints["md"]}) {
        margin-left: 1rem;
      }
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

const NavList = ({ mode }) => {
  return (
    <GlobalMenu>
      <ListLink to="/explore" mode={mode}>
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
    </GlobalMenu>
  )
}

export default NavList

NavList.propTypes = {
  mode: PropTypes.string.isRequired,
}
