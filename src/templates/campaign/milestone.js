import React from "react"
import PropTypes from "prop-types"

import Label from "../../components/label"
import { PlatformIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../utils/theme"

const Milestone = ({ type, daterange, name, details, region }) => {
  return (
    <div
      style={{ padding: `3rem`, minHeight: `400px`, display: `flex` }}
      data-cy="milestone"
    >
      <label
        style={{
          color: colors[NEGATIVE].altBackground,
          backgroundColor: colors[NEGATIVE].highlight,
          position: `absolute`,
          top: `4rem`,
          left: `4rem`,
          padding: `.25rem`,
          zIndex: `1`,
        }}
      >
        {type}
      </label>
      <div style={{ flex: 1, display: `grid`, gridTemplateColumns: `1fr 3fr` }}>
        <div style={{ justifySelf: `center`, alignSelf: `center` }}>
          <PlatformIcon />
        </div>
        <div style={{ padding: `1rem` }}>
          <Label id="timeline-milestone-date">{daterange}</Label>
          <h3>{name}</h3>
          <p>{details}</p>
          <p>{region}</p>
        </div>
      </div>
    </div>
  )
}

export default Milestone

Milestone.propTypes = {
  type: PropTypes.string.isRequired,
  daterange: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
}
