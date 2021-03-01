import React, { useState, useRef } from "react"
import PropTypes from "prop-types"

import { Link } from "gatsby"
import Carousel from "nuka-carousel"

import Button from "./button"
import { controlButtonLRStyle } from "./carousel-styles"
import Accordion from "./accordion"
import { POSITIVE } from "../utils/constants"

export default function CarouselAccordionCombo({
  id,
  emptyMessage,
  carouselList,
  card: CategoryCard,
  folds,
}) {
  const controlTextRef = useRef(null)
  const [slideIndex, setSlideIndex] = useState(0)
  return (
    <>
      {carouselList.length > 0 ? (
        <div data-cy={`${id}-carousel`}>
          <div
            css={`
               {
                display: flex;
                overflow: auto;
                gap: 0.5rem;
                margin: 1rem 0;
              }
            `}
            data-cy="carousel-list-text-control"
          >
            {carouselList.map((carouselItem, index) => (
              <Button
                key={carouselItem.id}
                ref={index === slideIndex ? controlTextRef : null}
                isSecondary={!(index === slideIndex)}
                action={() => setSlideIndex(index)}
              >
                {carouselItem.shortname}
              </Button>
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
                <Link
                  to={`/${id}/${carouselItem.id}`}
                  css={`
                     {
                      max-height: 30rem;
                    }
                  `}
                  data-cy={`carousel-${id}-card-link`}
                >
                  <CategoryCard id={carouselItem.id} mode={POSITIVE} />
                </Link>

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
  card: PropTypes.func,
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
}
