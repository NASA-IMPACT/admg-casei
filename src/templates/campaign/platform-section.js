import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import Carousel from "nuka-carousel"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/layout"
import ImageCaption from "../../components/image-caption"
import Image from "gatsby-image"

import Chip from "../../components/chip"
import { controlButtonLRStyle } from "../../components/carousel-styles"

const PlatformSection = ({ id, platforms, instruments }) => (
  <SectionBlock id={id}>
    <SectionHeader headline="Platforms & Instruments" id={id} />
    <SectionContent>
      <div data-cy="platform-carousel">
        {platforms.length > 0 ? (
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
            {platforms.map(platform => (
              <div key={platform.id} data-cy="platform">
                <Link to={`/platform/${platform.id}`}>
                  <div
                    style={{
                      position: `relative`,
                      marginRight: `1rem`,
                    }}
                  >
                    {platform.image && platform.image.gatsbyImg ? (
                      <Image
                        alt={platform.image.description}
                        fluid={platform.image.gatsbyImg.childImageSharp.fluid}
                      />
                    ) : (
                      <div
                        style={{
                          height: 150, // TO DO: make box fill space
                          backgroundColor: `#303641`,
                          display: `flex`,
                          alignItems: `center`,
                          justifyContent: `center`,
                        }}
                      >
                        No Image available.
                      </div>
                    )}
                    <ImageCaption id="platform-image">
                      {platform.longname || platform.shortname}
                    </ImageCaption>
                  </div>
                </Link>
                <div style={{ display: `flex`, flexWrap: `wrap` }}>
                  {platform.instruments
                    .filter(instrument =>
                      instruments.map(x => x.id).includes(instrument.id)
                    )
                    .map(instrument => (
                      <Link
                        to={`/instrument/${instrument.id}`}
                        key={instrument.id}
                      >
                        <Chip
                          id="instrument"
                          label={instrument.shortname}
                          hoverText={instrument.longname}
                        />
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
      dois {
        id
      }
      image {
        description
        gatsbyImg {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      shortname: short_name
      longname: long_name
      instruments {
        id
        shortname: short_name
        longname: long_name
      }
    }
    instruments {
      id
      shortname: short_name
      longname: long_name
      dois {
        id
      }
    }
  }
`

PlatformSection.propTypes = {
  id: PropTypes.string.isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.shape({
        description: PropTypes.string,
        gatsbyImg: PropTypes.shape({
          childImageSharp: PropTypes.object,
        }),
      }),
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
  instruments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default PlatformSection
