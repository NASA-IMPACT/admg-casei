import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

export default function Header({ shortname, longname }) {
  return <div>header</div>
}
export const instrumentHeaderFields = graphql`
  fragment instrumentHeaderFields on instrument {
    shortname: short_name
    longname: long_name
  }
`

Header.propTypes = {
  bounds: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  focusListing: PropTypes.string.isRequired,
  countDeployments: PropTypes.number.isRequired,
  countCollectionPeriods: PropTypes.number.isRequired,
  countDataProducts: PropTypes.number,
}
