import React, { useState } from "react"
import { Link } from "gatsby"
import { Button } from "@devseed-ui/button"

import FilterMenu from "./filter-menu"
import Searchbar from "./searchbar"

const ListLink = props => {
  return (
    <li
      style={{
        margin: `0 1rem 0 0`,
      }}
    >
      <Link
        to={props.to}
        activeStyle={{
          borderBottom: `2px solid hsla(0,0%,0%,0.9)`,
          padding: `0.4rem`,
        }}
        partiallyActive={true}
      >
        {props.children}
      </Link>
    </li>
  )
}

const ExploreMenu = ({ filters, addFilter, removeFilter }) => {
  const [isFiltering, toggleFilterMenu] = useState(false)

  return (
    <>
      <div
        style={{
          display: `flex`,
          flexDirection: `row`,
          justifyContent: `space-between`,
          alignItems: `flex-end`,
          marginBottom: `2rem`,
        }}
      >
        <Searchbar />
        <ul
          style={{
            display: `flex`,
            flexDirection: `row`,
            margin: 0,
            listStyle: `none`,
            alignItems: "center",
          }}
        >
          <ListLink to="/explore/campaigns" isActive>
            Campaigns
          </ListLink>
          <ListLink to="/explore/platforms">Platforms</ListLink>
          <ListLink to="/explore/instruments">Instruments</ListLink>
          <ListLink to="/explore/geophysical-concepts">
            Geophysical Concepts
          </ListLink>
        </ul>

        <Button
          variation="base-raised-dark"
          size="medium"
          title="filter"
          onClick={() => toggleFilterMenu(!isFiltering)}
          style={{ width: `90px` }}
        >
          {isFiltering ? `🆇` : `🔧`}
          {` `}
          Filter
        </Button>
      </div>
      {isFiltering && (
        <FilterMenu
          filters={filters}
          addFilter={addFilter}
          removeFilter={removeFilter}
        />
      )}
    </>
  )
}

export default ExploreMenu
