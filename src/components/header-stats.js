import React from "react"
import PropTypes from "prop-types"

const HeaderStats = ({ statList }) => (
  <dl style={{ display: `grid`, maxHeight: `6rem` }} data-cy="stats">
    {statList.map(stat => (
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
)

HeaderStats.propTypes = {
  statList: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default HeaderStats
