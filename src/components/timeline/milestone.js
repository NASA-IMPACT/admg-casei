import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Label from "../../components/label"
import theme from "../../utils/theme"
import Image from "../image"

export default function Milestone({
  type,
  startDate,
  endDate,
  name,
  details,
  region,
  placeholderImageUrl,
  placeholderImageAlt,
}) {
  return (
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
          zIndex: `1`,
        }}
      >
        {type}
      </label>
      <div style={{ display: `flex` }}>
        <div style={{ flex: `1` }}>
          <Image filename={placeholderImageUrl} alt={placeholderImageAlt} />
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
}

Milestone.propTypes = {
  type: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  placeholderImageUrl: PropTypes.string,
  placeholderImageAlt: PropTypes.string,
}
