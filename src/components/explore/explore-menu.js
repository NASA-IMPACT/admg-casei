import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const TabButton = styled.button`
  user-select: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding: 0.25rem 0;
  min-width: 2rem;
  background: none;
  text-shadow: none;
  border: 0;
  cursor: pointer;
  height: 2.5rem;
  text-transform: uppercase;
  font-weight: ${({ isSelected }) => isSelected && "bold"};
  color: ${colors[NEGATIVE].text};

  ::after {
    content: "";
    display: block;
    border-bottom: ${({ isSelected }) =>
      isSelected && `1px solid ${colors[NEGATIVE].text}`};
    width: 100%;
    position: relative;
    bottom: -0.25rem;
  }
`

const Count = styled.span`
  font-weight: lighter;
  font-size: smaller;
`

const ExploreMenu = ({
  selectedCategory,
  setSelectedCategory,
  filteredCount,
}) => (
  <ul
    css={`
       {
        display: flex;
        flex-direction: row;
        gap: 2rem;
        margin: 0;
        list-style: none;
        align-items: center;
        justify-content: center;
      }
    `}
    data-cy="tabbar"
  >
    <li>
      <TabButton
        onClick={() => setSelectedCategory("campaigns")}
        isSelected={selectedCategory === "campaigns"}
      >
        Campaigns
        <Count data-cy="campaigns-count"> ({filteredCount["campaigns"]})</Count>
      </TabButton>
    </li>

    <li>
      <TabButton
        onClick={() => setSelectedCategory("platforms")}
        isSelected={selectedCategory === "platforms"}
      >
        Platforms
        <Count data-cy="platforms-count"> ({filteredCount["platforms"]})</Count>
      </TabButton>
    </li>

    <li>
      <TabButton
        onClick={() => setSelectedCategory("instruments")}
        isSelected={selectedCategory === "instruments"}
      >
        Instruments
        <Count data-cy="instruments-count">
          {" "}
          ({filteredCount["instruments"]})
        </Count>
      </TabButton>
    </li>
  </ul>
)

ExploreMenu.propTypes = {
  selectedCategory: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  filteredCount: PropTypes.shape({
    campaigns: PropTypes.number.isRequired,
    platforms: PropTypes.number.isRequired,
    instruments: PropTypes.number.isRequired,
  }).isRequired,
}

export default ExploreMenu
