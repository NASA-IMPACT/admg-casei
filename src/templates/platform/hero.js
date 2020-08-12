import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Hero from "../../components/hero"
import Image from "../../components/image"

export default function PlatformHero({
  shortname,
  longname,
  campaigns,
  collectionPeriods,
  imgName,
  imgAlt,
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
      <Image filename={imgName} alt={imgAlt} />
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
  }
`

PlatformHero.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  campaigns: PropTypes.number.isRequired,
  collectionPeriods: PropTypes.number.isRequired,
  imgName: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
}
