import React, { useState } from "react"
import Carousel from "nuka-carousel"

export const RegionCarousel = ({ regions }) => {
  const [slideIndex, setSlideIndex] = useState(0)

  const controlButtonStyle = {
    padding: 0,
    borderRadius: `100%`,
    width: 42,
    height: 42,
    backgroundColor: `hsla(0,0%,100%,0.9)`,
    color: `hsla(0,0%,0%,0.73)`,
    fontWeight: `bold`,
    fontSize: `large`,
  }

  return (
    <>
      <div
        style={{
          display: `flex`,
          overflow: `scroll`,
          marginLeft: `-0.5rem`, // replaces :first { margin: 0 } on child
        }}
      >
        {regions.map((region, index) => (
          <button
            key={region.id}
            onClick={() => setSlideIndex(index)}
            style={{
              margin: `0 0.5rem`,
              padding: 0,
              fontWeight: 600,
              color: `rgba(255, 255, 255, 1)`,
              opacity: index === slideIndex ? 1 : 0.6,
              border: 0,
              background: `rgba(255, 255, 255, 0)`,
              textTransform: `uppercase`,
              textShadow: `0 2px 4px 0 rgba(0,0,0,0.5)`,
            }}
          >
            {region.shortname}
          </button>
        ))}
      </div>

      <Carousel
        slideIndex={slideIndex}
        afterSlide={slideIndex => setSlideIndex(slideIndex)}
        renderBottomCenterControls={null}
        defaultControlsConfig={{
          nextButtonText: `⦊`,
          nextButtonStyle: controlButtonStyle,
          prevButtonText: `⦉`,
          prevButtonStyle: controlButtonStyle,
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
        {regions.map((region, index) => (
          <div
            key={region.id}
            style={{
              height: 550,
              background: `linear-gradient(
                rgba(0, 0, 0, 0.2),
                rgba(0, 0, 0, 0.5)
                ),
                url(
                  https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001600/GSFC_20171208_Archive_e001600~orig.jpg
                ) center no-repeat`,
              backgroundSize: `100%`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
            }}
          >
            <div
              style={{
                fontSize: `xxx-large`,
                fontWeight: `bold`,
                textTransform: `uppercase`,
                color: `hsla(0,0%,100%,0.9)`,
              }}
            >
              {region.shortname}
            </div>
          </div>
        ))}
      </Carousel>
    </>
  )
}
