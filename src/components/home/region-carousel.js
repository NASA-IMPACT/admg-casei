import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Image from "gatsby-image"
import Carousel from "nuka-carousel"

import Button from "../button"
import { controlButtonLRStyle } from "../carousel-styles"

export const RegionCarousel = ({ regions }) => {
  const controlTextRef = useRef(null)

  const [slideIndex, setSlideIndex] = useState(1)
  const regionOrder = [
    "continental",
    "maritime",
    "coastal",
    "mountains",
    "agricultural",
    "urban",
    "island",
    "equitorial",
    "tropical",
    "mid-latitude",
    "polar",
    "sea ice",
    "coral",
    "desert",
    "forest",
    "rainforest",
  ]

  const sortedRegions = regions.sort(
    (a, b) =>
      regionOrder.indexOf(a.shortname) - regionOrder.indexOf(b.shortname)
  )

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
        {sortedRegions.map((region, index) => (
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
        {sortedRegions.map(region => (
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
              <span>{region.image.nasaImgAlt}</span>
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
