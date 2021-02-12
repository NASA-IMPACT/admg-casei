import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Image from "gatsby-image"

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
        <Image
          alt={image.description}
          fixed={image.gatsbyImg.childImageSharp.fixed}
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
          fixed(height: 200) {
            ...GatsbyImageSharpFixed
          }
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
