import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Hero from "../../components/hero"
import { PlatformIcon } from "../../icons"

export default function PlatformHero({
  shortname,
  longname,
  campaigns,
  collectionPeriods,
  image,
}) {
  return (
    <Hero
      backlink="/explore/platforms"
      tagline="Platform"
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
      image={
        image ? (
          <GatsbyImage
            image={getImage(image.gatsbyImg)}
            alt={image.description}
          />
        ) : (
          <PlatformIcon size="huge" />
        )
      }
      textToImageRatio={[5, 3]}
      stats={[
        { label: "Campaigns", number: campaigns },
        { label: "Collection Periods", number: collectionPeriods },
      ]}
      id="platform"
    />
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
          gatsbyImageData(width: 600, layout: CONSTRAINED, placeholder: BLURRED)
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
  }),
}
