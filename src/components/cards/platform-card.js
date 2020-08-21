import React from "react"
import PropTypes from "prop-types"
import Card from "./card"

const PlatformCard = ({
  shortname,
  longname,
  description,
  campaigns,
  collectionPeriodIds,
  instruments,
  stationary,
}) => (
  <Card
    tag={stationary && "Stationary"}
    footerList={[
      { count: campaigns.length, title: "Campaign" },
      { count: collectionPeriodIds.length, title: "Collection Period" },
      { count: instruments.length, title: "Instrument" },
    ]}
  >
    <big
      style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
      data-cy="shortname"
    >
      {shortname}
    </big>
    <p data-cy="longname">{longname}</p>
    {/* <p data-cy="description">{description}</p> */}
  </Card>
)

PlatformCard.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  description: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.string),
  collectionPeriodIds: PropTypes.arrayOf(PropTypes.string),
  instruments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  stationary: PropTypes.bool.isRequired,
}

export default PlatformCard
