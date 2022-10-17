/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import styled from "styled-components"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import { TimelineChart } from "../../components/timeline"
import { colors } from "../../theme"
import { NEGATIVE } from "../../utils/constants"

const Swatch = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
`

const Legend = styled.div`
  display: grid;
  grid-template-columns: 10px auto 10px auto;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
`

const TimelineSection = ({ id, deployments }) => {
  const events = deployments.reduce(
    (prev, deployment) => [...prev, ...deployment.events],
    []
  )

  return (
    <Section id={id}>
      <SectionHeader headline="Timeline" id={id} />
      <SectionContent>
        <Legend>
          <Swatch color={colors[NEGATIVE].dataVizOne} />
          {deployments.length} Deployment{deployments.length > 1 ? "s" : ""}
          {events.length > 0 ? (
            <>
              <Swatch color={colors[NEGATIVE].dataVizTwo} />
              {events.length} Significant Event{events.length > 1 ? "s" : ""}
            </>
          ) : null}
        </Legend>
        <TimelineChart {...{ deployments }} />
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

TimelineSection.propTypes = {
  id: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      aliases: PropTypes.array.isRequired,
      collectionPeriods: PropTypes.array.isRequired,
      regions: PropTypes.array.isRequired,
      campaign: PropTypes.string.isRequired,
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
}

export default TimelineSection
