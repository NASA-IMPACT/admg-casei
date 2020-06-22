import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Carousel from "nuka-carousel"

import SectionBlock from "../../components/section/section-block"

const Milestone = ({
  type = "Deployment",
  date = "June - September 2018",
  name = "ABoVE Deploymeny (L-band)",
  details = "some list of platforms, number of flights",
  region = "Alaska and Western Canada",
}) => (
  <div style={{ padding: `3rem` }} data-cy="milestone">
    <label
      style={{
        textTransform: `uppercase`,
        color: `#6B6B6B`,
      }}
    >
      {type}
    </label>
    <div style={{ display: `flex` }}>
      <div style={{ flex: `1` }}>
        <img
          src="https://picsum.photos/300/300"
          alt="Milestone-image"
          data-cy="overview-map"
        />
      </div>
      <div style={{ flex: `1.61803398875`, padding: `1rem` }}>
        <p>{date}</p>
        <h3>{name}</h3>
        <h4>{details}</h4>
        <p>{region}</p>
      </div>
    </div>
  </div>
)

Milestone.propTypes = {
  type: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
}

const TimelineSection = ({ deployments }) => (
  <SectionBlock headline="Timeline" id="timeline">
    <div data-cy="milestone-carousel">
      <Carousel
        defaultControlsConfig={{
          nextButtonText: ">",
          prevButtonText: "<",
        }}
      >
        {deployments.nodes.map(deployment => (
          <Milestone
            key={deployment.id}
            type="deployment"
            date={`${deployment.start} - ${deployment.end}`}
            name={`${deployment.longname} (${deployment.shortname})`}
            details={`${deployment.flights.length} Flights`}
            region={deployment.region.toString()}
          />
        ))}
      </Carousel>
    </div>
    <div data-cy="milestone-timeline"></div>
  </SectionBlock>
)

export const deployments = graphql`
  fragment deploymentFragment on deploymentConnection {
    nodes {
      id: uuid
      shortname: short_name
      flights: collection_periods
      region: geographical_regions
      campaign: campaign
      longname: long_name
      end: end_date
      start: start_date
    }
  }
`

TimelineSection.propTypes = {
  deployments: PropTypes.shape({
    nodes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        shortname: PropTypes.string.isRequired,
        flights: PropTypes.array.isRequired,
        region: PropTypes.array.isRequired,
        campaign: PropTypes.string.isRequired,
        longname: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
      })
    ),
  }),
}

export default TimelineSection
