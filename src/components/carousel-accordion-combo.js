import React, { useState, useRef } from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"
import Carousel from "nuka-carousel"
import Image from "gatsby-image"

import CampaignCard from "./cards/campaign-card"
import { controlButtonLRStyle, ControlTextButton } from "./carousel-styles"
import Accordion from "./accordion"
import { NEGATIVE } from "../utils/constants"
import { colors } from "../utils/theme"

export default function CarouselAccordionCombo({
  id,
  emptyMessage,
  carouselList,
  folds,
  isImage,
  placeholderImage,
}) {
  const controlTextRef = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)
  return (
    <>
      {carouselList.length > 0 ? (
        <div data-cy={`${id}-carousel`}>
          <div
            style={{
              display: `flex`,
              overflow: `auto`,
            }}
            data-cy="carousel-list-text-control"
          >
            {carouselList.map((carouselItem, index) => (
              <ControlTextButton
                key={carouselItem.id}
                ref={index === slideIndex ? controlTextRef : null}
                selected={index === slideIndex}
                onClick={() => setSlideIndex(index)}
              >
                {carouselItem.shortname}
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
            {carouselList.map(carouselItem => (
              <div
                key={carouselItem.id}
                data-cy={id}
                css={`
                   {
                    display: grid;
                    grid-template-columns: 26rem auto;
                    gap: 2rem;
                    height: 100%;
                  }
                `}
              >
                {isImage ? (
                  <ImageCarousel
                    id={id}
                    address={`/${id}/${carouselItem.id}`}
                    carouselImage={carouselItem.image}
                    placeholder={placeholderImage}
                    caption={carouselItem.longname || carouselItem.shortname}
                  />
                ) : (
                  <div
                    css={`
                       {
                        max-height: 30rem;
                      }
                    `}
                  >
                    <Link
                      to={`/${id}/${carouselItem.id}`}
                      data-cy={`carousel-${id}-card-link`}
                    >
                      <CampaignCard id={carouselItem.id} />
                    </Link>
                  </div>
                )}

                <Accordion folds={folds[carouselItem.id]} id="instrument" />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </>
  )
}

CarouselAccordionCombo.propTypes = {
  id: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  placeholderImage: PropTypes.func,
  carouselList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      image: PropTypes.shape({
        description: PropTypes.string,
        gatsbyImg: PropTypes.shape({
          childImageSharp: PropTypes.object,
        }),
      }),
    })
  ),
  folds: PropTypes.shape({
    shortname: PropTypes.string,
    longname: PropTypes.string,
    description: PropTypes.string,
    gcmdPhenomenas: PropTypes.arrayOf(
      PropTypes.shape({
        term: PropTypes.string.isRequired,
        topic: PropTypes.string.isRequired,
        variable_1: PropTypes.string.isRequired,
        variable_2: PropTypes.string.isRequired,
        variable_3: PropTypes.string.isRequired,
      })
    ),
  }),
  isImage: PropTypes.bool,
}

function ImageCarousel({
  id,
  address,
  carouselImage,
  placeholder: Placeholder,
  caption,
}) {
  return (
    <Link
      to={address}
      css={`
         {
          display: grid;
          grid-template-rows: auto 4rem;
          height: 100%;
        }
      `}
    >
      {carouselImage && carouselImage.gatsbyImg ? (
        <Image
          alt={carouselImage.description}
          fluid={carouselImage.gatsbyImg.childImageSharp.fluid}
          css={`
             {
              grid-area: 1 / 1 / 3 / 1;
            }
          `}
          data-cy={`${id}-image`}
        />
      ) : (
        <div
          css={`
             {
              grid-area: 1 / 1 / 3 / 1;

              min-height: 18rem;
              height: 100%;
              background-color: ${colors[NEGATIVE].background};
              display: flex;
              align-items: center;
              justify-content: center;
              padding-bottom: 2rem;
            }
          `}
          data-cy={`${id}-image`}
        >
          <Placeholder />
        </div>
      )}
      <label
        css={`
           {
            grid-area: 2 / 1 / 3 / 1;
            margin: 1rem;
            z-index: 1;
          }
        `}
        data-cy={`${id}-image-caption`}
      >
        {caption}
      </label>
    </Link>
  )
}

ImageCarousel.propTypes = {
  id: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  carouselImage: PropTypes.shape({
    description: PropTypes.string,
    gatsbyImg: PropTypes.shape({
      childImageSharp: PropTypes.object,
    }),
  }),
  placeholder: PropTypes.func.isRequired,
  caption: PropTypes.string.isRequired,
}
