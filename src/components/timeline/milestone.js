import React from "react"
import PropTypes from "prop-types"

import Label from "../../components/label"
import theme from "../../utils/theme"

const Milestone = ({
  type = "Deployment",
  startDate,
  endDate,
  name = "ABoVE Deploymeny (L-band)",
  details = "some list of platforms, number of flights",
  region = "Alaska and Western Canada",
}) => (
  <div style={{ padding: `3rem`, minHeight: `400px` }} data-cy="milestone">
    <label
      style={{
        textTransform: `uppercase`,
        fontSize: `small`,
        color: theme.color.primary,
        backgroundColor: theme.color.highlight,
        position: `absolute`,
        top: `4rem`,
        left: `4rem`,
        padding: `.25rem`,
      }}
    >
      {type}
    </label>
    <div style={{ display: `flex` }}>
      <div style={{ flex: `1` }}>
        <img
          src="https://images-assets.nasa.gov/image/AFRC2016-0292-08/AFRC2016-0292-08~medium.jpg"
          alt="Global Hawk prepping for deployment"
          data-cy="deployment-img"
        />
      </div>
      <div style={{ flex: `1.61803398875`, padding: `1rem` }}>
        <Label id="timeline-milestone-date">
          {`${startDate} — ${endDate}`}
        </Label>
        <h3>{name}</h3>
        <p>{details}</p>
        <p>{region}</p>
      </div>
    </div>
  </div>
)

export default Milestone

Milestone.propTypes = {
  type: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
}
