import React from "react"
import PropTypes from "prop-types"

const HeaderStat = ({ number, label }) => (
  <>
    <dt style={{ fontSize: `3rem` }}>
      {!number && number !== 0 ? "--" : number}
    </dt>
    <dd style={{ gridRowStart: 2, textTransform: `uppercase` }}>{label}</dd>
  </>
)

HeaderStat.propTypes = {
  number: PropTypes.number,
  label: PropTypes.string.isRequired,
}

export default HeaderStat
