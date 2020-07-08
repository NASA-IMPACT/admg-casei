import React from "react"
import PropTypes from "prop-types"

export default function Hero({
  tagTitle,
  title,
  description,
  stats,
  children,
}) {
  return (
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `3fr 5fr`,
        columnGap: `2rem`,
      }}
    >
      <div style={{ alignSelf: `end` }}>
        <div style={{ textTransform: `uppercase` }}>{tagTitle}</div>
        <h1>{title}</h1>
      </div>

      <div style={{ alignSelf: `start` }}>
        <p>{description}</p>
      </div>

      <div style={{ gridArea: `1 / 2 / 3 / 3` }}>{children}</div>
    </div>
  )
}

Hero.propTypes = {
  tagTitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
}
