import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { colors, breakpoints } from "../theme"
import { ChevronIcon } from "../icons"

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`

const PrimeMenuBlock = styled.section`
  color: #ffffff;

  @media screen and (min-width: ${breakpoints["sm"]}) {
    box-shadow: rgba(68, 63, 63, 0.08) 0px -1px 1px 0px,
      rgba(68, 63, 63, 0.08) 0px 2px 6px 0px;
    border-radius: 0.125rem;
    padding: 1rem;
    width: 16rem;
  }
`

const PrimeMenuBlockTitle = styled.h6`
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 400;
  opacity: 0.64;
  margin: 0 0 0.5rem 0;
  display: none;

  @media screen and (min-width: ${breakpoints["sm"]}) {
    display: block;
    margin: 0 0 0.25rem 0;
  }
`

const PrimeMenu = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  list-style: none;
  gap: 0.5rem;
  margin: 0;

  @media screen and (min-width: ${breakpoints["sm"]}) {
    flex-flow: row;
  }

  > li {
    position: relative;
    ${StyledLink} {
      color: ${({ mode }) => mode && colors[mode].text};
      margin: 0;
      text-transform: uppercase;
    }
    @media screen and (min-width: ${breakpoints["sm"]}) {
      margin: 0 0 0 1rem;
    }
  }

  ${PrimeMenuBlockTitle} {
    color: ${({ mode }) => mode && colors[mode].text};
  }
  ${PrimeMenuBlock} {
    transition: all 0.16s ease 0s;

    @media screen and (min-width: ${breakpoints["sm"]}) {
      position: absolute;
      right: 0;
      background: #ffffff;
      visibility: hidden;
      opacity: 0;
      transform: translate(0, -0.25rem);
    }
  }

  > li:hover
    ${/* sc-sel */ PrimeMenuBlock},
    > li:focus-within
    ${/* sc-sel */ PrimeMenuBlock},
    ${/* sc-sel */ PrimeMenuBlock}:hover,
    ${/* sc-sel */ PrimeMenuBlock}:focus {
    visibility: visible;
    opacity: 1;

    @media screen and (min-width: ${breakpoints["sm"]}) {
      transform: translate(0, 0.25rem);

      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 100%;
        background: #ffffff;
        height: 0.25rem;
        width: 100%;
        display: block;
      }
    }
  }
`

const PrimeSubmenu = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  padding: 0.25rem 1rem;
  margin: 0;
  gap: 0.5rem;
  list-style: none;
`

const activeStyles = {
  borderBottom: `1px solid`,
  fontWeight: `bold`,
}
const NavList = ({ mode, isMediumDown }) => {
  return (
    <PrimeMenu mode={mode}>
      <li>
        <StyledLink
          to="/explore"
          title="View the explore page"
          activeStyle={activeStyles}
          partiallyActive={true}
        >
          Explore
        </StyledLink>
      </li>
      <li>
        <StyledLink to="">
          Learn{" "}
          {!isMediumDown && (
            <ChevronIcon
              role="img"
              color={colors[mode].text}
              aria-label="chevron-icon"
            />
          )}
        </StyledLink>
        <PrimeMenuBlock>
          <PrimeMenuBlockTitle>Learn</PrimeMenuBlockTitle>
          <PrimeSubmenu aria-label="submenu">
            <li>
              <StyledLink
                to="/glossary"
                title="Explore the glossary"
                activeStyle={activeStyles}
              >
                Glossary
              </StyledLink>
            </li>
            <li>
              <StyledLink
                to="/faq"
                title="Explore the FAQ"
                activeStyle={activeStyles}
              >
                FAQ
              </StyledLink>
            </li>
            <li>
              <StyledLink
                to="/user-guide"
                title="Explore the user guide"
                activeStyle={activeStyles}
              >
                User Guide
              </StyledLink>
            </li>
          </PrimeSubmenu>
        </PrimeMenuBlock>
      </li>
      <li>
        <StyledLink to="/about" title="Learn more" activeStyle={activeStyles}>
          About
        </StyledLink>
      </li>
      <li>
        <StyledLink
          title="Send feedback"
          to="/contact"
          activeStyle={activeStyles}
        >
          Contact
        </StyledLink>
      </li>
    </PrimeMenu>
  )
}

NavList.propTypes = {
  isMediumDown: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
}
export default NavList
