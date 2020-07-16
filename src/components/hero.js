import React from "react"
import PropTypes from "prop-types"

import HeaderStat from "./header-stat"

export default function Hero({
  tagTitle,
  title,
  subTitle,
  description,
  stats,
  children,
  textToImageRatio = [3, 5],
  id,
}) {
  return (
    <header
      style={{
        display: `grid`,
        gridTemplateColumns: `${textToImageRatio[0]}fr ${textToImageRatio[1]}fr`,
        columnGap: `2rem`,
      }}
      data-cy={`${id}-hero`}
    >
      <div style={{ alignSelf: `end` }}>
        <p style={{ textTransform: `uppercase` }}>{tagTitle}</p>
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
            <HeaderStat
              key={stat.label}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </dl>
      )}
    </header>
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
  textToImageRatio: PropTypes.arrayOf(PropTypes.number),
  id: PropTypes.string,
}
