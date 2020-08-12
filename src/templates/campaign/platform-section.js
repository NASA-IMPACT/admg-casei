import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Carousel from "nuka-carousel"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"
import ImageCaption from "../../components/image-caption"
// import Image from "../../components/image"
import images from "../../content/platform-images.json"

// import Chip from "../../components/chip"

const PlatformSection = ({ platforms }) => (
  <SectionBlock id="platform">
    <SectionHeader headline="Platforms & Instruments" />
    <SectionContent>
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
                <Link to={`/platform/${platform.id}`} key={platform.id}>
                  <div style={{ position: `relative`, marginRight: `1rem` }}>
                    <img
                      src={images[platform.shortname].url}
                      alt={images[platform.shortname].alt}
                    />
                    <ImageCaption id="platform-image">
                      {platform.longname || platform.shortname}
                    </ImageCaption>
                  </div>
                </Link>
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
    </SectionContent>
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
