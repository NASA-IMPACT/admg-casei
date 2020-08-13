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
import { formatDateRange } from "../../utils/helpers"

const TimelineSection = ({
  deployments,
  placeholderImageUrl,
  placeholderImageAlt,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  /**
   * Finds the index of the milestone given the id.
   * @param {string} id - of milestone
   */
  const setSelectedMilestone = id =>
    // TODO: replace deployments array with the new array that will combine deployments with other carousel data
    setCurrentSlide(deployments.findIndex(deployment => deployment.id == id))

  const selectedMilestoneId = deployments[currentSlide].id

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
            {deployments.map(deployment => (
              <Milestone
                key={deployment.id}
                type="deployment"
                daterange={formatDateRange(deployment.start, deployment.end)}
                startDate={deployment.start}
                endDate={deployment.end}
                name={`${deployment.longname} (${deployment.shortname})`}
                details={`${deployment.flights.length} Flights`}
                region={deployment.regions.map(x => x.longname).join(", ")}
              />
            ))}
          </Carousel>
        </div>
        <MilestoneSelector
          events={deployments}
          timelineAction={setSelectedMilestone}
          activeMilestone={selectedMilestoneId}
        />
      </SectionContent>
    </SectionBlock>
  )
}

export const deploymentFields = graphql`
  fragment deploymentFields on campaign {
    deployments {
      id: uuid
      shortname: short_name
      flights: collection_periods
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
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      flights: PropTypes.array.isRequired,
      regions: PropTypes.array.isRequired,
      campaign: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
    })
  ),
}

export default TimelineSection
