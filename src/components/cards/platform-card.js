import React from "react"
import PropTypes from "prop-types"
import Card from "./card"

const PlatformCard = ({
  shortname,
  longname,
  description,
  collectionPeriodIds,
  instruments,
  stationary,
}) => (
  <Card tag={stationary && "Stationary"}>
    <big
      style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
      data-cy="shortname"
    >
      {shortname}
    </big>
    <p data-cy="longname">{longname}</p>
    <p data-cy="description">{description}</p>
    <div>
      <small data-cy="count1">
        <strong>{collectionPeriodIds.length}</strong> Collection Periods
      </small>{" "}
      ·{" "}
      <small data-cy="count2">
        <strong>{instruments.length}</strong> Instruments
      </small>
    </div>
  </Card>
)

PlatformCard.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  description: PropTypes.string.isRequired,
  collectionPeriodIds: PropTypes.arrayOf(PropTypes.string),
  instruments: PropTypes.arrayOf(PropTypes.string),
  stationary: PropTypes.bool.isRequired,
}

export default PlatformCard
