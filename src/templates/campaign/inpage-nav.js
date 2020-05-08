import React from "react"

const InpageNav = ({ website }) => {
  const InpageLink = props => (
    <li style={{ margin: `0 1rem 0 0` }}>
      <a href={props.to}>{props.children}</a>
    </li>
  )

  return (
    <div
      style={{
        position: `sticky`,
        top: `0`,
        backgroundColor: `#FEFEFE`,
        display: `flex`,
        padding: `1rem`,
        borderTop: `1px solid #9E9E9E`,
        borderBottom: `1px solid #9E9E9E`,
        justifyContent: `space-between`,
        alignItems: `center`,
      }}
    >
      <nav role="inpage-scroll">
        <ul
          style={{
            display: `flex`,
            flexDirection: `row`,
            justifyContent: `flex-start`,
            margin: 0,
            listStyle: `none`,
          }}
        >
          <InpageLink to="#overview">Overview</InpageLink>
          <InpageLink to="#milestones">Milestones</InpageLink>
          <InpageLink to="#platforms">Platforms & Instruments</InpageLink>
          <InpageLink to="#data">Data</InpageLink>
          <InpageLink to="#resources">Resources</InpageLink>
        </ul>
      </nav>
      <div style={{ display: `flex` }}>
        <div style={{ padding: `0 1rem`, borderLeft: `1px solid #9E9E9E` }}>
          <a href={website}>Primary Website</a>
        </div>
        <div style={{ padding: `0 1rem`, borderLeft: `1px solid #9E9E9E` }}>
          <a href={website}>Data</a>
        </div>
      </div>
    </div>
  )
}

export default InpageNav
