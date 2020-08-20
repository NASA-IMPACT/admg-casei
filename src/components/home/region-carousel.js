import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Image from "gatsby-image"
import Carousel from "nuka-carousel"
import styled from "styled-components"

import theme from "../../utils/theme"

const ControlTextButton = styled.button`
  margin: 0.2rem 0.5rem;
  padding: 0;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  opacity: ${({ selected }) => (selected ? 1 : 0.6)};
  border: 0;
  background: rgba(255, 255, 255, 0);
  text-transform: uppercase;
  text-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
`

// nuka carousel expects inline styles
const controlButtonLRStyle = {
  padding: 0,
  borderRadius: `100%`,
  width: 42,
  height: 42,
  backgroundColor: theme.color.base,
  color: `hsla(0,0%,0%,0.73)`,
  fontWeight: `bold`,
  fontSize: `large`,
}

export const RegionCarousel = ({ regions }) => {
  const element = useRef(null)

  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    if (element)
      element.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      })

    return () => {
      // cleanup
    }
  }, [slideIndex])

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
            ref={index === slideIndex ? element : null}
            selected={index === slideIndex}
            onClick={() => setSlideIndex(index)}
          >
            {region.shortname}
          </ControlTextButton>
        ))}
      </div>

      <Carousel
        slideIndex={slideIndex}
        afterSlide={slideIndex => setSlideIndex(slideIndex)}
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
                }}
              >
                <Image
                  alt={region.image.nasaImgAlt}
                  fluid={region.image.nasaImg.childImageSharp.fluid}
                  style={{ height: 550 }}
                />
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
