import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import CarouselAccordionCombo from "../../components/carousel-accordion-combo"
import PlatformCard from "../../components/cards/platform-card"

const PlatformSection = ({ id, collectionPeriods }) => {
  // We want to display one carousel item per combination of Platform and
  // Instrument. For example, if the GH Platform has 5 Deployments for this
  // Campaign, but only 2 unique sets of Instruments across those Deployments,
  // GH should appear in the carousel twice, with each carousel item displaying
  // one of those unique sets of Instruments.
  let uniqueSets = []
  let platforms = []

  // collect all the data
  for (const cdpi of collectionPeriods) {
    const platformId = cdpi.platform.id
    const instrumentIds = cdpi.instruments.map(instrument => instrument.id)
    const combinedId = `${platformId}${instrumentIds.sort().join()}`
    if (!uniqueSets.includes(combinedId)) {
      uniqueSets.push(combinedId)
      platforms.push({
        item: cdpi.platform,
        folds: cdpi.instruments,
      })
    }
  }

  return (
    <Section id={id}>
      <SectionHeader headline="Platforms & Instruments" id={id} />
      <SectionContent>
        {platforms && (
          <CarouselAccordionCombo
            id="platform"
            emptyMessage="No available related platforms or instruments"
            carouselList={platforms}
            card={PlatformCard}
          />
        )}
      </SectionContent>
    </Section>
  )
}

export const platformSectionFields = graphql`
  fragment platformSectionFields on campaign {
    platforms {
      id
      dois {
        id
      }
      image {
        description
        gatsbyImg {
          childImageSharp {
            gatsbyImageData(
              width: 600
              height: 400
              layout: CONSTRAINED
              placeholder: BLURRED
            )
          }
        }
      }
      shortname: short_name
      longname: long_name
      instruments {
        id
        shortname: short_name
        longname: long_name
        description
        image {
          description
          gatsbyImg {
            childImageSharp {
              gatsbyImageData(height: 100, layout: FIXED, placeholder: BLURRED)
            }
          }
        }
        gcmdPhenomenas: gcmd_phenomenas {
          term
          topic
          variable_1
          variable_2
          variable_3
        }
      }
    }
    instruments {
      id
      shortname: short_name
      longname: long_name
      dois {
        id
      }
    }
  }
`

PlatformSection.propTypes = {
  id: PropTypes.string.isRequired,
  collectionPeriods: PropTypes.array.isRequired,
}

export default PlatformSection
