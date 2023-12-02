import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import CarouselAccordionCombo from "../../components/carousel-accordion-combo"
import PlatformCard from "../../components/cards/platform-card"
import { getUniquePlatforms } from "../../utils/get-unique-platforms"

const PlatformSection = ({ id, collectionPeriods }) => {
  const platforms = getUniquePlatforms(collectionPeriods)

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
        gcmdPhenomena: gcmd_phenomena {
          id
          category
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
