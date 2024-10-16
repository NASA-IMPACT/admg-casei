import React, { useState, useRef } from "react"
import PropTypes from "prop-types"

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
                key={"button" + carouselItem.item.id + index}
                ref={index === slideIndex ? controlTextRef : null}
                isSecondary={!(index === slideIndex)}
                action={() => setSlideIndex(index)}
              >
                {carouselItem.item.shortname}
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
            heightMode="max"
          >
            {carouselList.map((carouselItem, index) => (
              <div
                role="group"
                key={carouselItem.item.id + "card" + index}
                data-cy={id}
                css={`
                   {
                    display: grid;
                    grid-template-columns: minmax(15rem, 1fr) minmax(auto, 3fr);
                    gap: 2rem;
                    height: 100%;
                    max-height: 30rem;
                  }
                `}
              >
                <CategoryCard
                  shortname={carouselItem.item.shortname}
                  mode={POSITIVE}
                />

                <Accordion folds={carouselItem.folds} id="instrument" />
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
      id: PropTypes.string,
      shortname: PropTypes.string,
      longname: PropTypes.string,
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
    gcmdPhenomena: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        term: PropTypes.string.isRequired,
        topic: PropTypes.string.isRequired,
        variable_1: PropTypes.string.isRequired,
        variable_2: PropTypes.string.isRequired,
        variable_3: PropTypes.string.isRequired,
      })
    ),
  }),
}
