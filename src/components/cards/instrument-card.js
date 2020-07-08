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
  <Card
    footerList={[
      { count: collectionPeriodIds.length, title: "Collection Periods" },
      { count: campaigns.length, title: "Campaigns" },
    ]}
  >
    <big
      style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
      data-cy="shortname"
    >
      {shortname}
    </big>
    <p data-cy="longname">{longname}</p>
    <p data-cy="description">{description}</p>
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
