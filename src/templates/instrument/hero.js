import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

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
      tagTitle="Instrument"
      title={shortname}
      subTitle={longname}
      description={description}
      textToImageRatio={[5, 3]}
      id="instrument"
    >
      {image && image.gatsbyImg ? (
        <GatsbyImage
          image={image.gatsbyImg.childImageSharp.gatsbyImageData}
          alt={image.description}
        />
      ) : (
        <InstrumentIcon size="huge" />
      )}
    </Hero>
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
          gatsbyImageData(height: 200, layout: FIXED)
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
