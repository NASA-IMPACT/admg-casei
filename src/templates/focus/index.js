import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, {
  PageBody,
  Paragraph,
  Section,
  SectionHeader,
  SectionContent,
} from "../../components/layout"
import SEO from "../../components/seo"
import Hero from "../../components/hero"
import ExternalLink from "../../components/external-link"
import RelatedCampaignsSection from "../../components/related-campaigns-section"
import FocusAreaGallery from "../../components/focus-area-gallery"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { getFocusIcon } from "../../icons/utils"

const FocusTemplate = ({ data }) => {
  const Icon = getFocusIcon(data.focusArea.uuid)
  return (
    <Layout>
      <SEO title={data.focusArea.shortname} lang="en" />

      <Hero
        tagTitle="Focus Area"
        title={data.focusArea.shortname}
        textToImageRatio={[8, 4]}
        id="focus"
      >
        <Icon color={colors[NEGATIVE].text} size="huge" />
      </Hero>

      <PageBody id="focus">
        <Section id="overview">
          <SectionHeader headline="Overview" id="overview" />
          <SectionContent columns={[1, 8]} minHeight={`12rem`}>
            <Paragraph data-cy="description">
              {data.focusArea.description}
            </Paragraph>
          </SectionContent>
          <SectionContent columns={[10, 3]}>
            <div
              style={{
                padding: `1rem`,
                border: `1px solid ${colors[NEGATIVE].text}`,
              }}
            >
              {data.focusArea.url ? (
                <ExternalLink
                  label={"NASA SMD Homepage"}
                  url={data.focusArea.url}
                  id="focus"
                />
              ) : (
                <span data-cy="focus-link">No Focus Area URL Available</span>
              )}
            </div>
          </SectionContent>
        </Section>

        <RelatedCampaignsSection
          id="focus-campaigns"
          campaigns={data.focusArea.campaigns}
        />

        <Section id="focus-areas" isSpaced>
          <SectionHeader tagline="explore nasa earth science" id="focus" />
          <SectionContent>
            <FocusAreaGallery
              focusAreas={data.allFocusArea.nodes}
              size="large"
            />
          </SectionContent>
        </Section>
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    focusArea(id: { eq: $slug }) {
      uuid
      campaigns {
        id
      }
      description: notes_public
      url
      shortname: short_name
      longname: long_name
    }
    allFocusArea {
      nodes {
        id
        shortname: short_name
        longname: long_name
      }
    }
  }
`

FocusTemplate.propTypes = {
  data: PropTypes.shape({
    focusArea: PropTypes.shape({
      uuid: PropTypes.string,
      campaigns: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
        })
      ).isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    }).isRequired,
    allFocusArea: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
}

export default FocusTemplate
