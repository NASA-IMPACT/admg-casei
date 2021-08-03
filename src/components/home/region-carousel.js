import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Carousel from "nuka-carousel"

import Button from "../button"
import { controlButtonLRStyle } from "../carousel-styles"

export const RegionCarousel = ({ regions }) => {
  const controlTextRef = useRef(null)

  const [slideIndex, setSlideIndex] = useState(1)

  return (
    <>
      <div
        css={`
           {
            display: flex;
            overflow: auto;
            gap: 0.5rem;
            margin: 1rem 0;
          }
        `}
        data-cy="region-text-control"
      >
        {regions.map((region, index) => (
          <Button
            key={region.id}
            ref={index === slideIndex ? controlTextRef : null}
            isSecondary={!(index === slideIndex)}
            action={() => setSlideIndex(index)}
          >
            {region.shortname}
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
            case "CenterLeft":
              return { left: -21 }
            case "CenterRight":
              return { right: -21 }
            default:
              // will apply all other keys
              return {}
          }
        }}
      >
        {regions.map(region => (
          <React.Fragment key={region.id}>
            <Link
              to="/explore/campaigns"
              state={{ selectedFilterId: region.id }}
              data-cy="region-type"
              css={`
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 1fr;
                align-items: center;
              `}
            >
              <div
                css={`
                  grid-area: 1 / 1 / 1 / 1;
                  z-index: -1;
                  height: 550px;
                `}
              >
                {region.image?.nasaImg && (
                  <GatsbyImage
                    image={region.image.nasaImg.childImageSharp.gatsbyImageData}
                    alt={region.image.nasaImgAlt}
                    css={`
                      height: 550px;
                    `}
                  />
                )}
              </div>

              <div
                css={`
                  grid-area: 1 / 1 / 1 / 1;
                  justify-self: center;
                  font-size: xxx-large;
                  font-weight: bold;
                  text-transform: uppercase;
                  text-shadow: 3px 3px 10px #333;
                `}
                data-cy="region-type-name"
              >
                {region.shortname}
              </div>
              <span>
                {region.image ? region.image.nasaImgAlt : "No image available."}
              </span>
            </Link>
          </React.Fragment>
        ))}
      </Carousel>
    </>
  )
}

RegionCarousel.propTypes = {
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
      image: PropTypes.shape({
        nasaImgUrl: PropTypes.string.isRequired,
        nasaImgAlt: PropTypes.string.isRequired,
      }),
    }).isRequired
  ),
}
