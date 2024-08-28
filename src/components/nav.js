import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import {
  Menu as DropdownMenu,
  MenuList,
  MenuButton,
  MenuLink,
} from "@reach/menu-button"
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

const DropdownMenuButton = styled(MenuButton)`
  margin: 0;
  text-transform: uppercase;
  background: none;
  border: none;
  text-shadow: none;
  outline: none;
  padding: 0;
  font-size: initial;
  font-weight: normal;
  &:hover {
    cursor: pointer;
    opacity: 0.64;
  }
  @media screen and (min-width: ${breakpoints["sm"]}) {
    margin-left: 0.5rem;
  }
  @media screen and (min-width: ${breakpoints["md"]}) {
    margin-left: 1rem;
  }
`

const DropdownMenuList = styled(MenuList)`
  background: white;
  position: relative;
  box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
    rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
  z-index: 501;
  list-style: none;

  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & > li {
    margin: 0;
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

const NavList = ({ mode, isMediumDown }) => {
  console.log(isMediumDown)
  return (
    <GlobalMenu>
      <ListLink to="/explore/campaigns" mode={mode}>
        Explore
      </ListLink>
      <ListLink to="/about" mode={mode}>
        About
      </ListLink>
      {isMediumDown ? (
        <>
          <ListLink to="/user-guide" mode={mode}>
            User Guide
          </ListLink>
          <ListLink to="/glossary" mode={mode}>
            Glossary
          </ListLink>
          <ListLink to="/faq" mode={mode}>
            FAQS
          </ListLink>
        </>
      ) : (
        <DropdownMenu>
          <DropdownMenuButton
            css={`
              color: ${colors[mode].text};
            `}
            as={isMediumDown ? "ul" : null}
          >
            Learn <span aria-hidden>▾</span>
          </DropdownMenuButton>
          <DropdownMenuList>
            <MenuLink as={ListLink} to="/user-guide" mode={mode}>
              User Guide
            </MenuLink>
            <MenuLink as={ListLink} to="/glossary" mode={mode}>
              Glossary
            </MenuLink>
            <MenuLink as={ListLink} to="/faq" mode={mode}>
              FAQS
            </MenuLink>
          </DropdownMenuList>
        </DropdownMenu>
      )}
      <ListLink to="/contact" mode={mode}>
        Contact
      </ListLink>
    </GlobalMenu>
  )
}

NavList.propTypes = {
  isMediumDown: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
}
export default NavList
