import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Carousel from "nuka-carousel"

import { SectionBlock } from "../../components/section"
import CampaignCard from "../../components/cards/campaign-card"

const RelatedCampaigns = ({ campaigns }) => {
  return (
    <SectionBlock headline="Related Campaigns" id="platform-related-campaigns">
      <div data-cy="related-campaign-carousel">
        {campaigns.length > 0 ? (
          <Carousel
            defaultControlsConfig={{
              nextButtonText: ">",
              prevButtonText: "<",
              pagingDotsStyle: {
                fill: "none",
              },
            }}
            slidesToShow={3}
          >
            {campaigns.map(campaign => (
              <div key={campaign.id} style={{ width: `16rem` }}>
                <Link to={`/campaign/${campaign.id}`}>
                  <CampaignCard
                    ongoing={campaign.ongoing}
                    shortname={campaign.shortname}
                    longname={campaign.longname}
                    daterange={`${new Date(
                      campaign.startdate
                    ).getFullYear()}—${new Date(
                      campaign.enddate
                    ).getFullYear()}`}
                    region={campaign.region}
                    countCollectionPeriods={campaign.countCollectionPeriods}
                    countDataProducts={campaign.countDataProducts}
                  />
                </Link>
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No available platforms or instruments</p>
        )}
      </div>
    </SectionBlock>
  )
}

export const platformCampaignFields = graphql`
  fragment platformCampaignFields on platform {
    campaigns {
      ongoing
      shortname: short_name
      longname: long_name
      id
      seasons {
        id
      }
      focus: focus_areas {
        id
      }
      startdate: start_date
      enddate: end_date
      region: region_description
      deploymentIds: deployments
      countCollectionPeriods: number_collection_periods
      countDataProducts: number_data_products
    }
  }
`

RelatedCampaigns.propTypes = {
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      ongoing: PropTypes.bool,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string,
      id: PropTypes.string.isRequired,
      seasons: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
      focus: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
      startdate: PropTypes.string.isRequired,
      enddate: PropTypes.string,
      region: PropTypes.string.isRequired,
      deploymentIds: PropTypes.arrayOf(PropTypes.string),
      countCollectionPeriods: PropTypes.number,
      countDataProducts: PropTypes.number,
    }).isRequired
  ).isRequired,
}

export default RelatedCampaigns
