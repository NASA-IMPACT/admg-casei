import React from "react"
import { Link } from "gatsby"

const ListLink = (props) => (
  <li style={{ margin: `0 1rem 0 0` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

const Nav = () => {
  return (
    <nav>
      <ul
        style={{
          display: `flex`,
          flexDirection: `row`,
          justifyContent: `flex-end`,
          margin: 0,
          listStyle: `none`,
        }}
      >
        <ListLink to="/explore">Explore</ListLink>
        <ListLink to="/resources">Resources</ListLink>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
      </ul>
    </nav>
  )
}

export default Nav
