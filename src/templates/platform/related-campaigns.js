import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Carousel from "nuka-carousel"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/layout"
import CampaignCard from "../../components/cards/campaign-card"
import { controlButtonLRStyle } from "../../components/carousel-styles"

const RelatedCampaigns = ({ id, campaigns }) => {
  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Related Campaigns" id={id} />
      <SectionContent>
        {campaigns.length > 0 ? (
          <div data-cy="related-campaign-carousel">
            <Carousel
              defaultControlsConfig={{
                nextButtonText: `⦊`,
                nextButtonStyle: controlButtonLRStyle,
                prevButtonText: `⦉`,
                prevButtonStyle: controlButtonLRStyle,
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
                    <CampaignCard id={campaign.id} />
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

RelatedCampaigns.propTypes = {
  id: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default RelatedCampaigns
