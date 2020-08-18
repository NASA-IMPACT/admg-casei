import React from "react"
import PropTypes from "prop-types"

import Card from "./card"

const CampaignCard = ({
  logo,
  ongoing,
  shortname,
  longname,
  daterange,
  region,
  deployments = 0,
  countDataProducts = 0,
}) => (
  <Card
    image={logo}
    tag={ongoing && "Ongoing"}
    footerList={[
      { count: deployments, title: "Deployments" },
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
  logo: PropTypes.shape({
    nasaImgAlt: PropTypes.string.isRequired,
    nasaImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }).isRequired,
  ongoing: PropTypes.bool.isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  daterange: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  deployments: PropTypes.number,
  countDataProducts: PropTypes.number,
}

export default CampaignCard
