import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Carousel from "nuka-carousel"

import MilestoneSelector from "../../components/timeline/milestone-selector"
import Milestone from "../../components/timeline/milestone"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"

const TimelineSection = ({
  deployments,
  placeholderImageUrl,
  placeholderImageAlt,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  console.log("placeholderImageUrl", placeholderImageUrl)
  /**
   * Finds the index of the milestone given the id.
   * @param {string} id - of milestone
   */
  const setSelectedMilestone = id =>
    // TODO: replace deployments array with the new array that will combine deployments with other carousel data
    setCurrentSlide(
      deployments.nodes.findIndex(deployment => deployment.id == id)
    )

  const selectedMilestoneId = deployments.nodes[currentSlide].id

  return (
    <SectionBlock id="timeline">
      <SectionHeader headline="Timeline" />
      <SectionContent withBackground>
        <div data-cy="milestone-carousel">
          <Carousel
            defaultControlsConfig={{
              nextButtonText: ">",
              prevButtonText: "<",
              pagingDotsStyle: {
                fill: "none",
              },
            }}
            slideIndex={currentSlide}
            afterSlide={slideIndex => setCurrentSlide(slideIndex)}
          >
            {deployments.nodes.map(deployment => (
              <Milestone
                key={deployment.id}
                type="deployment"
                startDate={deployment.start}
                endDate={deployment.end}
                name={`${deployment.longname} (${deployment.shortname})`}
                details={`${deployment.flights.length} Flights`}
                region={deployment.region.toString()}
                placeholderImageUrl={placeholderImageUrl}
                placeholderImageAlt={placeholderImageAlt}
              />
            ))}
          </Carousel>
        </div>
        <MilestoneSelector
          events={deployments.nodes}
          timelineAction={setSelectedMilestone}
          activeMilestone={selectedMilestoneId}
        />
      </SectionContent>
    </SectionBlock>
  )
}

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
  placeholderImageUrl: PropTypes.string.isRequired,
  placeholderImageAlt: PropTypes.string.isRequired,
}

export default TimelineSection
