import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import SimpleTable from "../../components/tables/simpleTable"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"

export default function Entities({ platforms }) {
  return (
    <SectionBlock id="instrument-airborne-entities">
      <SectionHeader
        headline="Related Airborne Entities"
        to="#instrument-airborne-entities"
      />
      <SectionContent>
        <SimpleTable
          id="instrument-airborne-entities"
          tableHeaders={["Platform", "Campaigns"]}
          tableRows={platforms.map(platform => [
            platform.shortname,
            platform.campaigns.map(x => x.shortname).join(", "),
          ])}
        />
      </SectionContent>
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
