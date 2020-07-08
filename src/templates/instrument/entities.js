import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Table from "../../components/table"
import { SectionBlock } from "../../components/section"

export default function Entities({ platforms, campaigns }) {
  return (
    <SectionBlock
      headline="Related Airborne Entities"
      id="instrument-airborne-entities"
    >
      <Table
        tableData={platforms.map(platform => {
          return {
            title: platform.shortname,
            content: campaigns.map(x => x.node.shortname).join(", "),
          }
        })}
      />
    </SectionBlock>
  )
}

export const instrumentEntitiesFields = graphql`
  fragment instrumentEntitiesFields on instrument {
    platforms
  }
  fragment instrumentPlatformFields on platformConnection {
    nodes {
      id
      shortname: short_name
      longname: long_name
    }
  }
`

Entities.propTypes = {
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    })
  ),
  campaigns: PropTypes.arrayOf(
    PropTypes.shape({ node: PropTypes.shape({ shortname: PropTypes.string }) })
  ),
}
