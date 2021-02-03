import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import ComboAccordion from "../../components/accordion/combo-accordion"

const PlatformSection = ({ id, platforms, instruments }) => {
  return (
    <Section id={id}>
      <SectionHeader headline="Platforms & Instruments" id={id} />
      <SectionContent>
        {platforms && instruments && (
          <ComboAccordion
            id="platform"
            isImage
            emptyMessage="No available related platforms or instruments"
            carouselList={platforms}
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
            fluid(maxWidth: 600, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
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
              fixed(height: 100) {
                ...GatsbyImageSharpFixed
              }
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
