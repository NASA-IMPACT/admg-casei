import React from "react"
import PropTypes from "prop-types"

import Card from "./card"
import logos from "../../content/campaign-logos.json"

const CampaignCard = ({
  ongoing,
  shortname,
  longname,
  daterange,
  region,
  countCollectionPeriods = 0,
  countDataProducts = 0,
}) => (
  <Card
    image={logos[shortname]}
    tag={ongoing && "Ongoing"}
    footerList={[
      { count: countCollectionPeriods, title: "Collection Periods" },
      { count: countDataProducts, title: "Data Products" },
    ]}
  >
    <big
      style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
      data-cy="shortname"
    >
      {shortname}
    </big>
    <p data-cy="longname">{longname}</p>
    <div>
      <small data-cy="daterange">{daterange}</small>
    </div>
    <div>
      <small data-cy="region">{region}</small>
    </div>
  </Card>
)

CampaignCard.propTypes = {
  ongoing: PropTypes.bool.isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  daterange: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  countCollectionPeriods: PropTypes.number,
  countDataProducts: PropTypes.number,
}

export default CampaignCard
