import React from "react"
import PropTypes from "prop-types"

import Label from "../../components/label"
import { PlatformIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const Milestone = ({ type, daterange, name, details, region }) => {
  return (
    <div
      css={`
        padding: 3rem;
        min-height: 400px;
        display: flex;
      `}
      data-cy="milestone"
    >
      <label
        css={`
          color: ${colors[NEGATIVE].altBackground};
          background-color: ${colors[NEGATIVE].highlight};
          position: absolute;
          top: 4rem;
          left: 4rem;
          padding: 0.25rem;
          z-index: 1;
        `}
      >
        {type}
      </label>
      <div
        css={`
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 3fr;
        `}
      >
        <div
          css={`
            justify-self: center;
            align-self: center;
          `}
        >
          <PlatformIcon />
        </div>
        <div
          css={`
            padding: 1rem;
          `}
        >
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
