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
              style={{
                display: `grid`,
                gridTemplateColumns: `1fr`,
                gridTemplateRows: `1fr`,
                alignItems: `center`,
              }}
            >
              <div
                style={{
                  gridArea: `1 / 1 / 1 / 1`,
                  zIndex: -1,
                  height: 550,
                }}
              >
                {region.image?.nasaImg && (
                  <GatsbyImage
                    image={region.image.nasaImg.childImageSharp.gatsbyImageData}
                    alt={region.image.nasaImgAlt}
                    style={{ height: 550 }}
                  />
                )}
              </div>

              <div
                style={{
                  gridArea: `1 / 1 / 1 / 1`,
                  justifySelf: `center`,
                  fontSize: `xxx-large`,
                  fontWeight: `bold`,
                  textTransform: `uppercase`,
                  textShadow: `3px 3px 10px #333`,
                }}
                data-cy="region-type-name"
              >
                {region.shortname}
              </div>
              <span>{region.image ? region.image.nasaImgAlt : "No image available."}</span>
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
      }).isRequired,
    }).isRequired
  ),
}
