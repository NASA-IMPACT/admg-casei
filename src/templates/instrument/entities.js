import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import SimpleTable from "../../components/tables/simpleTable"
import { SectionBlock } from "../../components/section"

export default function Entities({ platforms }) {
  return (
    <SectionBlock
      headline="Related Airborne Entities"
      id="instrument-airborne-entities"
    >
      <SimpleTable
        id="instrument-airborne-entities"
        tableHeaders={["Platform", "Campaigns"]}
        tableRows={platforms.map(platform => [
          platform.shortname,
          platform.campaigns.map(x => x.shortname).join(", "),
        ])}
      />
    </SectionBlock>
  )
}

export const instrumentEntitiesFields = graphql`
  fragment instrumentEntitiesFields on instrument {
    platforms {
      campaigns {
        shortname: short_name
      }
      shortname: short_name
    }
  }
`

Entities.propTypes = {
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      campaigns: PropTypes.arrayOf(
        PropTypes.shape({ shortname: PropTypes.string })
      ),
    })
  ),
}
