import React from "react"
import { Link } from "gatsby"

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

const ExploreMenu = props => (
  <>
    <div
      style={{
        display: `flex`,
        justifyContent: `space-around`,
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
        <ListLink to="/explore/campaigns" isActive>
          Campaigns
        </ListLink>
        <ListLink to="/explore/platforms">Platforms</ListLink>
        <ListLink to="/explore/instruments">Instruments</ListLink>
      </ul>
    </div>
    <Searchbar {...props} />
  </>
)

export default ExploreMenu
