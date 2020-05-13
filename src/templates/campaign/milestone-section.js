import React from "react"
import { graphql } from "gatsby"
import Carousel from "nuka-carousel"

const MilestoneSection = ({ deployments }) => {
  const Milestone = ({
    type = "Deployment",
    date = "June - September 2018",
    name = "ABoVE Deploymeny (L-band)",
    details = "some list of platforms, number of flights",
    region = "Alaska and Western Canada",
  }) => (
    <div
      style={{ backgroundColor: `#FBFBFB`, padding: `3rem` }}
      data-cy="milestone"
    >
      <label
        style={{
          textTransform: `uppercase`,
          color: `#9E9E9E`,
        }}
      >
        {type}
      </label>
      <div style={{ display: `flex` }}>
        <div style={{ flex: `1` }}>
          <img
            src="https://via.placeholder.com/400/ffffff/c0392b/&text=image"
            alt="Milestone-image"
            data-cy="overview-map"
          />
        </div>
        <div style={{ flex: `1.61803398875`, padding: `1rem` }}>
          <p>{date}</p>
          <h1>{name}</h1>
          <h2>{details}</h2>
          <p>{region}</p>
        </div>
      </div>
    </div>
  )

  return (
    <section className="inpage-nav" id="milestones" data-cy="milestone-section">
      <h2>Milestones</h2>
      <div data-cy="milestone-carousel">
        <Carousel
          defaultControlsConfig={{
            nextButtonText: ">",
            prevButtonText: "<",
          }}
        >
          {deployments.nodes.map(deployment => (
            <Milestone
              type="deployment"
              date={`${deployment.start} - ${deployment.end}`}
              name={`${deployment.longname} (${deployment.name})`}
              details={`${deployment.flights} Flights`}
              region={deployment.region}
            />
          ))}
        </Carousel>
      </div>
      <div data-cy="milestone-timeline"></div>
    </section>
  )
}

export default MilestoneSection

export const deployments = graphql`
  fragment deploymentFragment on DeploymentCsvConnection {
    nodes {
      name: ADMG_deployment_name
      flights: number_flights
      region: Geographical_Region_Type_s_
      campaign: campaign_shortname
      alias: Deployment_Alias_es_
      longname: deployment_longname
      end: end_date
      start: start_date
    }
  }
`
