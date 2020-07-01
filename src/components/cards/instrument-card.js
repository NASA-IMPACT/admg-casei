import React from "react"
import PropTypes from "prop-types"
import Card from "./card"

const InstrumentCard = ({
  shortname,
  longname,
  description,
  collectionPeriodIds,
  campaigns,
}) => (
  <Card>
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
        <strong>{campaigns.length}</strong> Campaigns
      </small>
    </div>
  </Card>
)

InstrumentCard.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  description: PropTypes.string.isRequired,
  collectionPeriodIds: PropTypes.arrayOf(PropTypes.string),
  campaigns: PropTypes.arrayOf(PropTypes.string),
}

export default InstrumentCard
