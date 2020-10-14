import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Hero from "../../components/hero"
import Image from "gatsby-image"

export default function PlatformHero({
  shortname,
  longname,
  campaigns,
  collectionPeriods,
  image,
}) {
  return (
    <Hero
      tagTitle={shortname}
      title={longname}
      textToImageRatio={[5, 3]}
      stats={[
        { label: "Campaigns", number: campaigns },
        { label: "Flights", number: collectionPeriods },
      ]}
      id="platform"
    >
      {image && (
        <Image
          alt={image.description}
          fluid={image.gatsbyImg.childImageSharp.fluid}
        />
      )}
    </Hero>
  )
}
export const platformHeroFields = graphql`
  fragment platformHeroFields on platform {
    shortname: short_name
    longname: long_name
    campaigns {
      id
    }
    collectionPeriods: collection_periods
    image {
      description
      gatsbyImg {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

PlatformHero.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  campaigns: PropTypes.number.isRequired,
  collectionPeriods: PropTypes.number.isRequired,
  image: PropTypes.shape({
    description: PropTypes.string.isRequired,
    gatsbyImg: PropTypes.shape({
      childImageSharp: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
}
