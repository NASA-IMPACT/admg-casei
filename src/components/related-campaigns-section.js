import React, { useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Carousel from "nuka-carousel"

import { Section, SectionHeader, SectionContent } from "./layout"
import CampaignCard from "./cards/campaign-card"
import { controlButtonLRStyle } from "./carousel-styles"
import { NEGATIVE } from "../utils/constants"
import { colors } from "../theme"
import { useContainerDimensions } from "../utils/use-container-dimensions"

const RelatedCampaignsSection = ({ id, campaigns }) => {
  const CARD_WIDTH = 250
  const container = useRef(null)
  const { width } = useContainerDimensions(container)
  const columns = Math.floor(width / CARD_WIDTH) || 1

  return (
    <Section id={id}>
      <SectionHeader headline="Related Campaigns" id={id} />
      <SectionContent>
        {campaigns.length > 0 ? (
          <div data-cy="related-campaign-carousel" ref={container}>
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
              slidesToShow={columns}
            >
              {campaigns.map(campaign => (
                <div
                  key={campaign.id}
                  css={`
                    width: ${CARD_WIDTH}px;
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
