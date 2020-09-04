import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import SimpleTable from "../../components/tables/simpleTable"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"

export default function Entities({ id, platforms }) {
  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Related Airborne Entities" id={id} />
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
  id: PropTypes.string.isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      campaigns: PropTypes.arrayOf(
        PropTypes.shape({ shortname: PropTypes.string })
      ),
    })
  ),
}
