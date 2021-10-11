import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Carousel from "nuka-carousel"

import MilestoneSelector from "./milestone-selector"
import Milestone from "./milestone"
import { Section, SectionHeader, SectionContent } from "../../components/layout"
import { formatDateRange } from "../../utils/helpers"
import { controlButtonLRStyle } from "../../components/carousel-styles"

const TimelineSection = ({ id, deployments }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  /**
   * Finds the index of the milestone given the id.
   * @param {string} id - of milestone
   */
  const setSelectedMilestone = deploymentId =>
    // TODO: replace deployments array with the new array that will combine deployments with other carousel data
    setCurrentSlide(
      deployments.findIndex(deployment => deployment.id == deploymentId)
    )

  const selectedMilestoneId = deployments[currentSlide].id

  return (
    <Section id={id}>
      <SectionHeader headline="Timeline" id={id} />
      <SectionContent withBackground>
        <div data-cy="milestone-carousel">
          <Carousel
            aria-label="milestone-carousel"
            defaultControlsConfig={{
              nextButtonText: `⦊`,
              nextButtonStyle: controlButtonLRStyle,
              prevButtonText: `⦉`,
              prevButtonStyle: controlButtonLRStyle,
              pagingDotsStyle: {
                fill: "none",
              },
            }}
            renderBottomCenterControls={false}
            slideIndex={currentSlide}
            afterSlide={slideIndex => setCurrentSlide(slideIndex)}
          >
            {deployments.map(deployment => (
              <Milestone
                key={deployment.id}
                type="deployment"
                daterange={formatDateRange(deployment.start, deployment.end)}
                name={
                  deployment.longname
                    ? `${deployment.longname} (${deployment.shortname})`
                    : deployment.shortname
                }
                details={`${deployment.collectionPeriods.length} CDCPs`}
                region={deployment.regions.map(x => x.longname).join(", ")}
              />
            ))}
          </Carousel>
        </div>
        {deployments.length > 1 && (
          <MilestoneSelector
            events={deployments}
            timelineAction={setSelectedMilestone}
            activeMilestone={selectedMilestoneId}
          />
        )}
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
