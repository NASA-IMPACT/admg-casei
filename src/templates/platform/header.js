import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Hero from "../../components/hero"
import Image from "../../components/image"

export default function Header({ shortname, longname }) {
  return (
    <Hero
      tagTitle={shortname}
      title={longname}
      textToImageRatio={[5, 3]}
      id="platform"
    >
      <Image
        filename="platform.png" // TODO: replace with platform image
        alt="an aircraft transporting a spacecraft"
      />
    </Hero>
  )
}
export const platformHeaderFields = graphql`
  fragment platformHeaderFields on platform {
    shortname: short_name
    longname: long_name
  }
`

Header.propTypes = {
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
}
