/* eslint-disable react/prop-types */
import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import { DeploymentMap, TimelineChart } from "../../components/deployments"

const DeploymentEventsSection = ({ id, deployments, bounds, campaignName }) => {
  const [selectedDeployment, setSelectedDeployment] = useState(null)
  return (
    <Section id={id}>
      <SectionHeader headline="Deployment & Events" id={id} />
      <SectionContent>
        <DeploymentMap
          campaignName={campaignName}
          deployments={deployments}
          bounds={bounds}
          selectedDeployment={selectedDeployment}
        />
        <TimelineChart
          {...{ deployments }}
          selectedDeployment={selectedDeployment}
          setSelectedDeployment={setSelectedDeployment}
        />
      </SectionContent>
    </Section>
  )
}

export const deploymentFields = graphql`
  fragment deploymentFields on campaign {
    deployments {
      id: uuid
      longname: long_name
      shortname: short_name
      aliases: aliases {
        shortname: short_name
      }
      collectionPeriods: collection_periods {
        id
      }
      end: end_date
      start: start_date
      regions: geographical_regions {
        short_name
      }
      events: significant_events {
        end: end_date
        start: start_date
        shortname: short_name
        description: description
        id
      }
    }
  }
`

DeploymentEventsSection.propTypes = {
  id: PropTypes.string.isRequired,
  campaignName: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      aliases: PropTypes.array.isRequired,
      collectionPeriods: PropTypes.array.isRequired,
      regions: PropTypes.array.isRequired,
      campaign: PropTypes.string,
      end: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          end: PropTypes.string.isRequired,
          start: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }).isRequired
      ),
    })
  ),
  bounds: PropTypes.array,
}

export default DeploymentEventsSection
