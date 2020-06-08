import React from "react"
import { Link } from "gatsby"

const ListLink = props => {
  return (
    <li style={{ margin: `0 1rem 0 0` }}>
      <Link
        to={props.to}
        activeStyle={{
          color: `#AAC9FF`,
          fontWeight: `bold`,
        }}
        partiallyActive={true}
      >
        {props.children}
      </Link>
    </li>
  )
}

const ExploreMenu = () => (
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
        <ListLink to="/explore/campaigns">Campaigns</ListLink>
        <ListLink to="/explore/platforms">Platforms</ListLink>
        <ListLink to="/explore/instruments">Instruments</ListLink>
      </ul>
    </div>
  </>
)

export default ExploreMenu
