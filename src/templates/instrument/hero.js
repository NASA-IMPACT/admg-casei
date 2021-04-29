import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Hero from "../../components/hero"
import { InstrumentIcon } from "../../icons"

export default function InstrumentHero({
  shortname,
  longname,
  description,
  image,
}) {
  return (
    <Hero
      tagline="Instrument"
      title={
        <>
          {shortname}
          <br />
          <span
            css={`
              font-size: 1.5rem;
              line-height: 1.75rem;
              font-weight: normal;
            `}
          >
            {longname}
          </span>
        </>
      }
      description={description}
      image={
        image ? (
          <GatsbyImage
            image={getImage(image.gatsbyImg)}
            alt={image.description}
          />
        ) : (
          <InstrumentIcon size="huge" />
        )
      }
      textToImageRatio={[5, 3]}
      id="instrument"
    />
  )
}
export const instrumentHeroFields = graphql`
  fragment instrumentHeroFields on instrument {
    shortname: short_name
    longname: long_name
    description
    image {
      description
      gatsbyImg {
        childImageSharp {
          gatsbyImageData(
            height: 400
            layout: CONSTRAINED
            placeholder: BLURRED
          )
        }
      }
    }
  }
`

InstrumentHero.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({
    description: PropTypes.string.isRequired,
    gatsbyImg: PropTypes.shape({
      childImageSharp: PropTypes.object.isRequired,
    }),
  }),
}
