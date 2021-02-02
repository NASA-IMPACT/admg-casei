import React, { useState, useRef } from "react"
import PropTypes from "prop-types"

import { graphql, Link } from "gatsby"
import Carousel from "nuka-carousel"
import Image from "gatsby-image"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import ImageCaption from "../../components/image-caption"
import {
  controlButtonLRStyle,
  ControlTextButton,
} from "../../components/carousel-styles"
import Accordion from "../../components/accordion"
import theme from "../../utils/theme"

const PlatformSection = ({ id, platforms, instruments }) => {
  const controlTextRef = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)
  // const updatedPlatforms = platforms.map(platform => {
  //   return {
  //     ...platform,
  //     instruments: platform.instruments.filter(instrument =>
  //       instruments.map(x => x.id).includes(instrument.id)
  //     ),
  //   }
  // })
  return (
    <Section id={id}>
      <SectionHeader headline="Platforms & Instruments" id={id} />
      <SectionContent>
        {platforms.length > 0 ? (
          <div data-cy="platforms-carousel">
            <div
              style={{
                display: `flex`,
                overflow: `auto`,
              }}
              data-cy="carousel-list-text-control"
            >
              {platforms.map((platform, index) => (
                <ControlTextButton
                  key={platform.id}
                  ref={index === slideIndex ? controlTextRef : null}
                  selected={index === slideIndex}
                  onClick={() => setSlideIndex(index)}
                >
                  {platform.shortname}
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
                  case "CenterLeft":
                    return {
                      marginLeft: "-50px",
                    }
                  case "CenterRight":
                    return {
                      marginRight: "-50px",
                    }
                  default:
                    // will apply all other keys
                    return
                }
              }}
              heightMode="max"
            >
              {platforms.map(platform => (
                <div key={platform.id} data-cy="platform">
                  <Link to={`/platform/${platform.id}`}>
                    <div
                      style={{
                        display: `grid`,
                        gridTemplateColumns: `1fr minmax(auto,  ${theme.layout.maxWidth}) 1fr`,
                        width: `100vw`,
                        alignContent: `center`,
                      }}
                    >
                      {platform.image && platform.image.gatsbyImg ? (
                        <Image
                          alt={platform.image.description}
                          fluid={platform.image.gatsbyImg.childImageSharp.fluid}
                          data-cy="platform-image"
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
                          data-cy="platform-image"
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
                    {/* {platform.instruments
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
                      ))} */}
                    <Accordion
                      folds={platform.instruments.filter(instrument =>
                        instruments.map(x => x.id).includes(instrument.id)
                      )}
                    />
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

export const platformSectionFields = graphql`
  fragment platformSectionFields on campaign {
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
        description
        gcmdPhenomenas: gcmd_phenomenas {
          term
          topic
          variable_1
          variable_2
          variable_3
        }
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
