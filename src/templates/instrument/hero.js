import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Hero from "../../components/hero"
import Image from "gatsby-image"

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
      {image && (
        <Image
          alt={image.description}
          fixed={image.gatsbyImg.childImageSharp.fixed}
        />
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
  }).isRequired,
}
