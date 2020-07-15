import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Label from "../../components/label"

export default function Background({ shortname }) {
  return (
    <div style={{ marginTop: `2rem` }} data-cy="instrument-background">
      <div style={{ padding: `1rem 0` }}>
        <Label id={"instrument-manufacturer"} showBorder>
          {`${shortname} Primary Website`}
        </Label>
        {"N/A"}
      </div>
      <div style={{ padding: `1rem 0` }}>
        <Label id={"funding-source"} showBorder>
          {`${shortname} Secondary Website`}
        </Label>
        {"N/A"}
      </div>
    </div>
  )
}

Background.propTypes = {
  description: PropTypes.string.isRequired,
}
