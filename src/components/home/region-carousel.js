import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Image from "gatsby-image"
import Carousel from "nuka-carousel"
import { controlButtonLRStyle, ControlTextButton } from "../carousel-styles"

import { SmallTitle, Banner, BodyText } from "../../theme/typography"

export const RegionCarousel = ({ regions }) => {
  const controlTextRef = useRef(null)

  const [slideIndex, setSlideIndex] = useState(0)

  return (
    <>
      <div
        style={{
          display: `flex`,
          overflow: `scroll`,
        }}
        data-cy="region-text-control"
      >
        {regions.map((region, index) => (
          <ControlTextButton
            key={region.id}
            ref={index === slideIndex ? controlTextRef : null}
            selected={index === slideIndex}
            onClick={() => setSlideIndex(index)}
          >
            <SmallTitle>{region.shortname}</SmallTitle>
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
              to="/explore"
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
                {region.image.nasaImg && (
                  <Image
                    alt={region.image.nasaImgAlt}
                    fluid={region.image.nasaImg.childImageSharp.fluid}
                    style={{ height: 550 }}
                  />
                )}
              </div>

              <Banner
                style={{
                  gridArea: `1 / 1 / 1 / 1`,
                  justifySelf: `center`,
                  textTransform: `capitalize`,
                  textShadow: `3px 3px 10px #333`,
                }}
                data-cy="region-type-name"
              >
                {region.shortname}
              </Banner>
              <BodyText>{region.image.nasaImgAlt}</BodyText>
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
