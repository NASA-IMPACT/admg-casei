import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import CarouselAccordionCombo from "../../components/carousel-accordion-combo"
import PlatformCard from "../../components/cards/platform-card"

const PlatformSection = ({ id, platforms, instruments }) => {
  return (
    <Section id={id}>
      <SectionHeader headline="Platforms & Instruments" id={id} />
      <SectionContent>
        {platforms && instruments && (
          <CarouselAccordionCombo
            id="platform"
            emptyMessage="No available related platforms or instruments"
            carouselList={platforms}
            card={PlatformCard}
            folds={platforms.reduce(
              (acc, platform) =>
                Object.assign(acc, {
                  [platform.id]: platform.instruments.filter(instrument =>
                    instruments.map(x => x.id).includes(instrument.id)
                  ),
                }),
              {}
            )}
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
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.shape({
        description: PropTypes.string,
        gatsbyImg: PropTypes.shape({
          childImageSharp: PropTypes.object,
        }),
      }),
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      instruments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
        }).isRequired
      ).isRequired,
    }).isRequired
  ).isRequired,
  instruments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default PlatformSection
