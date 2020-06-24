import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Carousel from "nuka-carousel"

import SectionBlock from "../../components/section/section-block"
import ImageCaption from "../../components/image-caption"

const PlatformSection = ({ platforms }) => (
  <SectionBlock headline="Platforms & Instruments" id="platform">
    <div data-cy="platform-carousel">
      {platforms.nodes.length > 0 ? (
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
          {platforms.nodes.map(node => (
            <div key={node.shortname} data-cy="platform">
              <div style={{ display: `flex` }}>
                <img
                  src="https://picsum.photos/300/300"
                  alt="Milestone-image"
                  data-cy="overview-map"
                />
              </div>
              <ImageCaption id="platform-image">{node.longname}</ImageCaption>
            </div>
          ))}
        </Carousel>
      ) : (
        <p>No available platforms or instruments</p>
      )}
    </div>
  </SectionBlock>
)

export const platforms = graphql`
  fragment platformFragment on platformConnection {
    nodes {
      shortname: short_name
      longname: long_name
    }
  }
`

PlatformSection.propTypes = {
  platforms: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        shortname: PropTypes.string.isRequired,
        longname: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
}

export default PlatformSection
