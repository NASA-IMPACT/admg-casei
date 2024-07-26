import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import { NEGATIVE } from "../../utils/constants"
import { colors, breakpoints } from "../../theme"

const TabButton = styled(Link)`
  /* remove default button style */
  user-select: none;
  background: none;
  text-shadow: none;
  color: ${colors[NEGATIVE].text};
  border: none;

  /* add tab button style */
  cursor: ${({ $isSelected }) => ($isSelected ? "default" : "pointer")};
  text-transform: uppercase;
  font-weight: ${({ $isSelected }) => $isSelected && "bold"};
  padding: 0.5rem;
`

const Label = ({ isSelected, children }) => {
  const afterElement = `
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  bottom: -0.5rem;
  margin-left: -1.5rem;
  width: 3rem;
`
  return (
    <span
      css={`
        position: relative;
        font-size: medium;

        &::after {
          ${afterElement};
          border-bottom: ${isSelected && `2px solid ${colors[NEGATIVE].text}`};

          transform: ${isSelected ? `scaleX(1)` : `scaleX(0.05)`};
        }

        ${TabButton}:hover & {
          opacity: ${isSelected ? `inherit` : 0.64};

          &::after {
            ${afterElement};
            border-bottom: 2px solid ${colors[NEGATIVE].text};
            transform: scaleX(1);
            transition: 0.5s transform cubic-bezier(0, 0, 0.1, 1);
          }
        }
      `}
    >
      {children}
    </span>
  )
}

Label.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

const Count = styled.span`
  font-weight: lighter;

  ${TabButton}:hover & {
    opacity: ${({ isSelected }) => (isSelected ? `inherit` : 0.64)};
  }
`

const Tab = ({ id, to, isSelected, label, count }) => (
  <TabButton role="tab" to={to} $isSelected={isSelected}>
    <Label isSelected={isSelected}>{label}</Label>

    <Count isSelected={isSelected} data-cy={`${id}-count`}>
      {" "}
      ({count ? count : 0})
    </Count>
  </TabButton>
)

Tab.propTypes = {
  id: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number,
}

const ExploreMenu = ({ selectedCategory, filteredCount }) => (
  <div
    role="tablist"
    css={`
       {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0rem;
        margin-top: 2rem;
        list-style: none;
        align-items: flex-start;
        justify-content: center;
        @media screen and (min-width: ${breakpoints["sm"]}) {
          align-items: center;
          justify-content: center;
          flex-direction: row;
        }
      }
    `}
    data-cy="tabbar"
  >
    <Tab
      to="/explore/campaigns"
      isSelected={selectedCategory === "campaigns"}
      id="campaigns"
      label="Campaigns"
      count={filteredCount["campaigns"]}
    />
    <Tab
      to="/explore/platforms"
      isSelected={selectedCategory === "platforms"}
      id="platforms"
      label="Platforms"
      count={filteredCount["platforms"]}
    />

    <Tab
      to="/explore/instruments"
      isSelected={selectedCategory === "instruments"}
      id="instruments"
      label="Instruments"
      count={filteredCount["instruments"]}
    />

    <Tab
      to="/explore/products"
      isSelected={selectedCategory === "products"}
      id="products"
      label="Data Products"
      count={filteredCount["products"]}
    />
  </div>
)

ExploreMenu.propTypes = {
  selectedCategory: PropTypes.oneOf([
    "campaigns",
    "platforms",
    "instruments",
    "products",
  ]).isRequired,
  filteredCount: PropTypes.shape({
    campaigns: PropTypes.number,
    platforms: PropTypes.number,
    instruments: PropTypes.number,
    products: PropTypes.number,
  }),
}

export default ExploreMenu
