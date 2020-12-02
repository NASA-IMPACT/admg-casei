import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Carousel from "nuka-carousel"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import CampaignCard from "../../components/cards/campaign-card"
import AccordionComp from "../../components/accordion"
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
              slideIndex={slideIndex}
              afterSlide={slideIndex => {
                setSlideIndex(slideIndex)
                controlTextRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "nearest",
                })
              }}
              renderBottomCenterControls={null}
              defaultControlsConfig={{
                nextButtonText: `⦊`,
                nextButtonStyle: controlButtonLRStyle,
                prevButtonText: `⦉`,
                prevButtonStyle: controlButtonLRStyle,
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
            >
              {campaigns.map(campaign => (
                <div
                  key={campaign.id}
                  data-cy="related-campaign"
                  style={{
                    display: `grid`,
                    gridTemplateColumns: `1fr minmax(auto,  ${theme.layout.maxWidth}) 1fr`,
                    width: `100vw`,
                    // minHeight: `35rem`,
                    alignContent: `center`,
                  }}
                >
                  <div
                    style={{
                      display: `grid`,
                      gridTemplateColumns: `1fr 3fr`,
                      gridGap: `1.5rem`,
                      width: `70rem`,
                    }}
                  >
                    <div style={{ width: `26rem`, height: `100%` }}>
                      <Link to={`/campaign/${campaign.id}`}>
                        <CampaignCard size="large" id={campaign.id} />
                      </Link>
                    </div>
                    <AccordionComp />
                  </div>
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
