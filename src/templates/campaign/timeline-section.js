/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import { TimelineChart } from "./timeline-chart"

const TimelineSection = ({ id, deployments }) => {
  return (
    <Section id={id}>
      <SectionHeader headline="Timeline" id={id} />
      <SectionContent>
        <TimelineChart {...{ deployments }} />
      </SectionContent>
    </Section>
  )
}

export const deploymentFields = graphql`
  fragment deploymentFields on campaign {
    deployments {
      id: uuid
      shortname: short_name
      collectionPeriods: collection_periods {
        id
      }
      regions: geographical_regions {
        longname: long_name
      }
      campaign
      longname: long_name
      end: end_date
      start: start_date
    }
  }
`

TimelineSection.propTypes = {
  id: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      collectionPeriods: PropTypes.array.isRequired,
      regions: PropTypes.array.isRequired,
      campaign: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
    })
  ),
}

export default TimelineSection
