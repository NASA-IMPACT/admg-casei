import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const TabButton = styled.button`
  /* remove default button style */
  user-select: none;
  background: none;
  text-shadow: none;
  color: ${colors[NEGATIVE].text};
  border: none;

  /* add tab button style */
  cursor: ${({ isSelected }) => (isSelected ? "default" : "pointer")};
  text-transform: uppercase;
  font-weight: ${({ isSelected }) => isSelected && "bold"};
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

const Tab = ({ id, onClick, isSelected, label, count }) => (
  <TabButton role="tab" onClick={onClick} isSelected={isSelected}>
    <Label isSelected={isSelected}>{label}</Label>
    <Count isSelected={isSelected} data-cy={`${id}-count`}>
      {" "}
      ({count})
    </Count>
  </TabButton>
)

Tab.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
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
    <Tab
      onClick={() => setSelectedCategory("campaigns")}
      isSelected={selectedCategory === "campaigns"}
      id="campaigns"
      label="Campaigns"
      count={filteredCount["campaigns"]}
    />
    <Tab
      onClick={() => setSelectedCategory("platforms")}
      isSelected={selectedCategory === "platforms"}
      id="platforms"
      label="Platforms"
      count={filteredCount["platforms"]}
    />

    <Tab
      onClick={() => setSelectedCategory("instruments")}
      isSelected={selectedCategory === "instruments"}
      id="instruments"
      label="Instruments"
      count={filteredCount["instruments"]}
    />
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
