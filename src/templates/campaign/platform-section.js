import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Carousel from "nuka-carousel"

import { SectionBlock } from "../../components/section"
import ImageCaption from "../../components/image-caption"
// import Chip from "../../components/chip"

const PlatformSection = ({ platforms }) => (
  <SectionBlock headline="Platforms & Instruments" id="platform">
    <div data-cy="platform-carousel">
      {platforms.length > 0 ? (
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
          {platforms.map(platform => (
            <div
              key={platform.id}
              style={{ minHeight: `360px` }}
              data-cy="platform"
            >
              <div style={{ position: `relative` }}>
                <img
                  src="https://picsum.photos/300/300"
                  alt="platform-image"
                  data-cy="platform-image"
                />
                <ImageCaption id="platform-image">
                  {platform.longname || platform.shortname}
                </ImageCaption>
              </div>
              {/* <div style={{ display: `flex`, flexWrap: `wrap` }}> */}
              {/* TODO: map through instrument tags */}
              {/* <Chip id="platform" label="test chip" /> */}
              {/* </div> */}
            </div>
          ))}
        </Carousel>
      ) : (
        <p>No available platforms or instruments</p>
      )}
    </div>
  </SectionBlock>
)

export const platformFields = graphql`
  fragment platformFields on campaign {
    platforms {
      id
      shortname: short_name
      longname: long_name
    }
  }
`

PlatformSection.propTypes = {
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default PlatformSection
