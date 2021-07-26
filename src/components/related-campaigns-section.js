import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Carousel from "nuka-carousel"

import { Section, SectionHeader, SectionContent } from "./layout"
import CampaignCard from "./cards/campaign-card"
import { controlButtonLRStyle } from "./carousel-styles"
import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"

const RelatedCampaignsSection = ({ id, campaigns }) => {
  return (
    <Section id={id}>
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
                  fill: colors[NEGATIVE].text,
                },
              }}
              getControlsContainerStyles={key => {
                switch (key) {
                  case "BottomCenter":
                    return {
                      bottom: "-42px",
                    }
                  default:
                    // will apply all other keys
                    return
                }
              }}
              heightMode="max"
              slidesToShow={4}
            >
              {campaigns.map(campaign => (
                <div
                  key={campaign.id}
                  css={`
                    width: 16rem;
                    height: 100%;
                  `}
                  data-cy="related-campaign"
                >
                  <Link to={`/campaign/${campaign.shortname}`}>
                    <CampaignCard shortname={campaign.shortname} />
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <p>No available related campaigns</p>
        )}
      </SectionContent>
    </Section>
  )
}

RelatedCampaignsSection.propTypes = {
  id: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default RelatedCampaignsSection
