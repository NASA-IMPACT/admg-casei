import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const Count = styled.span`
  font-weight: lighter;
  font-size: smaller;
`

const TabButton = ({ onClick, isSelected, children }) => {
  const afterElement = `
  content: "";
  display: block;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -1.5rem;
  width: 3rem;
`
  return (
    <button
      role="tab"
      css={`
        /* remove default button style */
        user-select: none;
        background: none;
        text-shadow: none;
        color: ${colors[NEGATIVE].text};
        border: none;

        /* add tab button style */
        cursor: ${isSelected ? "default" : "pointer"};
        text-transform: uppercase;
        font-weight: ${isSelected && "bold"};
        padding: 0.5rem;
        position: relative;

        &::after {
          ${afterElement};
          border-bottom: ${isSelected && `2px solid ${colors[NEGATIVE].text}`};

          transform: ${isSelected ? `scaleX(1)` : `scaleX(0.05)`};
        }

        &:hover {
          opacity: ${isSelected ? `inherit` : 0.64};

          &::after {
            ${afterElement};
            border-bottom: 2px solid ${colors[NEGATIVE].text};
            transform: scaleX(1);
            transition: 0.5s transform cubic-bezier(0, 0, 0.1, 1);
          }
        }
      `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

TabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

const ExploreMenu = ({
  selectedCategory,
  setSelectedCategory,
  filteredCount,
}) => (
  <div
    role="tablist"
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
    <TabButton
      onClick={() => setSelectedCategory("campaigns")}
      isSelected={selectedCategory === "campaigns"}
    >
      Campaigns
      <Count data-cy="campaigns-count"> ({filteredCount["campaigns"]})</Count>
    </TabButton>

    <TabButton
      onClick={() => setSelectedCategory("platforms")}
      isSelected={selectedCategory === "platforms"}
    >
      Platforms
      <Count data-cy="platforms-count"> ({filteredCount["platforms"]})</Count>
    </TabButton>

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
  </div>
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
