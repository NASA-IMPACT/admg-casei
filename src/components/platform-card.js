import React from "react"
import PropTypes from "prop-types"

const PlatformCard = ({
  shortname,
  longname,
  description,
  collectionPeriodIds,
  instruments,
  stationary,
}) => (
  <div
    style={{
      backgroundColor: `#303641`,
      boxShadow: `rgba(68, 63, 63, 0.08) 0px -1px 1px 0px, rgba(68, 63, 63, 0.08) 0px 2px 6px 0px`,
      padding: `1rem`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `space-between`,
      height: `100%`,
    }}
    data-cy="explore-card"
  >
    <div style={{ marginBottom: `2rem` }}>
      <div
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          margin: `0.5rem 0 2rem 0`,
        }}
      >
        <div
          className="placeholder"
          style={{
            borderRadius: `2.5rem`,
            backgroundColor: `#9E9E9E`,
            width: `2.5rem`,
            height: `2.5rem`,
          }}
        ></div>
        {stationary && (
          <div
            style={{
              textTransform: `uppercase`,
              border: `1px solid`,
              padding: `0.25rem`,
            }}
            data-cy="stationary-tag"
          >
            stationary
          </div>
        )}
      </div>
      <big
        style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
        data-cy="shortname"
      >
        {shortname}
      </big>
      <p data-cy="longname">{longname}</p>
      <p data-cy="description">{description}</p>
    </div>
    <div>
      <small data-cy="count1">
        <strong>{collectionPeriodIds.length}</strong> Collection Periods
      </small>{" "}
      ·{" "}
      <small data-cy="count2">
        <strong>{instruments.length}</strong> Instruments
      </small>
    </div>
  </div>
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
