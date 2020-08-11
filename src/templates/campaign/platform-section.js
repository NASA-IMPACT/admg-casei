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
import Image from "../../components/image"

import Chip from "../../components/chip"

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
                <Link to={`/platform/${platform.id}`}>
                  <div style={{ position: `relative`, marginRight: `1rem` }}>
                    <Image
                      filename="platform.png" // TODO: replace with platform image
                      alt="an aircraft transporting a spacecraft"
                    />
                    <ImageCaption id="platform-image">
                      {platform.longname || platform.shortname}
                    </ImageCaption>
                  </div>
                </Link>
                <div style={{ display: `flex`, flexWrap: `wrap` }}>
                  {platform.instruments.map(instrument => (
                    <Link
                      to={`/instrument/${instrument.id}`}
                      key={instrument.id}
                    >
                      <Chip id="instrument" label={instrument.shortname} />
                    </Link>
                  ))}
                </div>
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
      instruments {
        id
        shortname: short_name
      }
    }
  }
`

PlatformSection.propTypes = {
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      instruments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
}

export default PlatformSection
