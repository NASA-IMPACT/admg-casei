import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Carousel from "nuka-carousel"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import CampaignCard from "../../components/cards/campaign-card"
import {
  controlButtonLRStyle,
  ControlTextButton,
} from "../../components/carousel-styles"
import theme from "../../utils/theme"

const CampaignsAndInstruments = ({ id, campaigns }) => {
  const controlTextRef = useRef(null)

  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <Section id={id}>
      <SectionHeader headline="Related Campaigns & Instruments" id={id} />
      <SectionContent>
        {campaigns.length > 0 ? (
          <div data-cy="related-campaign-carousel">
            <div
              style={{
                display: `flex`,
                overflow: `scroll`,
              }}
              data-cy="region-text-control"
            >
              {campaigns.map((campaign, index) => (
                <ControlTextButton
                  key={campaign.id}
                  ref={index === slideIndex ? controlTextRef : null}
                  selected={index === slideIndex}
                  onClick={() => setSlideIndex(index)}
                >
                  {campaign.shortname}
                </ControlTextButton>
              ))}
            </div>
            <Carousel
              defaultControlsConfig={{
                nextButtonText: `⦊`,
                nextButtonStyle: controlButtonLRStyle,
                prevButtonText: `⦉`,
                prevButtonStyle: controlButtonLRStyle,
                pagingDotsStyle: {
                  fill: theme.color.base,
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
                  style={{ width: `16rem`, height: `100%` }}
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
          <p>No available related campaigns</p>
        )}
      </SectionContent>
    </Section>
  )
}

CampaignsAndInstruments.propTypes = {
  id: PropTypes.string.isRequired,
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default CampaignsAndInstruments
