import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Hero from "../../components/hero"
import Image from "../../components/image"

export default function Header({ shortname, longname, description }) {
  return (
    <Hero
      tagTitle="Instrument"
      title={shortname}
      subTitle={longname}
      description={description}
      textToImageRatio={[5, 3]}
      id="instrument"
    >
      <Image
        filename="platform.png" // TODO: replace with instrument image
        alt="an aircraft transporting a spacecraft"
      />
    </Hero>
  )
}
export const instrumentHeroFields = graphql`
  fragment instrumentHeroFields on instrument {
    shortname: short_name
    longname: long_name
    description
  }
`

Header.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
