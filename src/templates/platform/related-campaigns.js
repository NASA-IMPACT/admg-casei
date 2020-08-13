import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Carousel from "nuka-carousel"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"
import CampaignCard from "../../components/cards/campaign-card"
import { formatYearRange } from "../../utils/helpers"

const RelatedCampaigns = ({ campaigns }) => {
  return (
    <SectionBlock id="platform-related-campaigns">
      <SectionHeader headline="Related Campaigns" />
      <SectionContent>
        {campaigns.length > 0 ? (
          <div data-cy="related-campaign-carousel">
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
                <div
                  key={campaign.id}
                  style={{ width: `16rem` }}
                  data-cy="related-campaign"
                >
                  <Link to={`/campaign/${campaign.id}`}>
                    <CampaignCard
                      ongoing={campaign.ongoing}
                      shortname={campaign.shortname}
                      longname={campaign.longname}
                      daterange={formatYearRange(
                        campaign.startdate,
                        campaign.enddate
                      )}
                      region={campaign.region}
                      countCollectionPeriods={campaign.countCollectionPeriods}
                      countDataProducts={campaign.countDataProducts}
                    />
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <p>No available platforms or instruments</p>
        )}
      </SectionContent>
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
      deployments {
        id
      }
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
