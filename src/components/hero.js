import React from "react"
import PropTypes from "prop-types"

export default function Hero({
  tagTitle,
  title,
  subTitle,
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
        <h1 style={{ marginBottom: `0` }}>{title}</h1>
        {subTitle && <p style={{ fontSize: `x-large` }}>{subTitle}</p>}
      </div>

      <div style={{ alignSelf: `start` }}>
        <p>{description}</p>
      </div>

      <div style={{ gridArea: `1 / 2 / 3 / 3` }}>{children}</div>
      {stats && (
        <dl style={{ display: `grid` }} data-cy="stats">
          {stats.map(stat => (
            <>
              <dt style={{ fontSize: `3rem` }}>
                {!stat.number && stat.number !== 0 ? "--" : stat.number}
              </dt>
              <dd style={{ gridRowStart: 2, textTransform: `uppercase` }}>
                {stat.label}
              </dd>
            </>
          ))}
        </dl>
      )}
    </div>
  )
}

Hero.propTypes = {
  tagTitle: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({ number: PropTypes.number, label: PropTypes.string })
  ),
  children: PropTypes.node,
}
