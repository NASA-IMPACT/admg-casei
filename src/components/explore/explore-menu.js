import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import SortMenu from "./sort-menu"
import theme from "../../utils/theme"

const TabButton = styled.button`
  user-select: none;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding: 0.25rem 0.75rem;
  min-width: 2rem;
  background: none;
  text-shadow: none;
  border: 0;
  cursor: pointer;
  height: 2.5rem;
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ isSelected }) =>
    isSelected ? theme.color.link : theme.color.base};
`

const ExploreMenu = ({
  selectedCategory,
  setSelectedCategory,
  filteredCount,
  sortOrder,
  setSortOrder,
}) => (
  <div
    style={{
      display: `flex`,
      justifyContent: `space-between`,
      padding: `2rem 0`,
      marginBottom: `2rem`,
    }}
  >
    <ul
      style={{
        display: `flex`,
        flexDirection: `row`,
        margin: 0,
        listStyle: `none`,
        alignItems: "center",
      }}
      data-cy="tabbar"
    >
      <li>
        <TabButton
          onClick={() => setSelectedCategory("campaigns")}
          isSelected={selectedCategory === "campaigns"}
        >
          Campaigns
          <span data-cy="campaigns-count"> ({filteredCount["campaigns"]})</span>
        </TabButton>
      </li>

      <li>
        <TabButton
          onClick={() => setSelectedCategory("platforms")}
          isSelected={selectedCategory === "platforms"}
        >
          Platforms
          <span data-cy="platforms-count"> ({filteredCount["platforms"]})</span>
        </TabButton>
      </li>

      <li>
        <TabButton
          onClick={() => setSelectedCategory("instruments")}
          isSelected={selectedCategory === "instruments"}
        >
          Instruments
          <span data-cy="instruments-count">
            {" "}
            ({filteredCount["instruments"]})
          </span>
        </TabButton>
      </li>
    </ul>

    <SortMenu
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      category={selectedCategory}
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
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
}

export default ExploreMenu
