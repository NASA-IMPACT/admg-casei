import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { SectionBlock } from "../../components/section"

export default function Overview({ description }) {
  return (
    <SectionBlock headline="Overview" id="platform-overview">
      <p>{description}</p>
    </SectionBlock>
  )
}
export const platformOverviewFields = graphql`
  fragment platformOverviewFields on platform {
    description
  }
`

Overview.propTypes = {
  description: PropTypes.string.isRequired,
}
