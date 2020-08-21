import React from "react"
import PropTypes from "prop-types"
import Card from "./card"

const InstrumentCard = ({ shortname, longname, description, campaigns }) => (
  <Card footerList={[{ count: campaigns.length, title: "Campaign" }]}>
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

InstrumentCard.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string,
  description: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(PropTypes.string),
}

export default InstrumentCard
