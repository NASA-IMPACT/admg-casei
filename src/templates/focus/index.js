import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import VisuallyHidden from "@reach/visually-hidden"

import Layout, {
  PageBody,
  Section,
  SectionHeader,
  SectionContent,
} from "../../components/layout"
import SEO from "../../components/seo"
import Hero from "../../components/hero"
import ExternalLink from "../../components/external-link"
import InpageNav from "../../components/inpage-nav"
import RelatedCampaignsSection from "../../components/related-campaigns-section"
import FocusAreaGallery from "../../components/focus-area-gallery"

import { NEGATIVE, POSITIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { getFocusIcon } from "../../icons/utils"

const FocusTemplate = ({ data: { focusArea, allFocusArea }, path }) => {
  const Icon = getFocusIcon(focusArea.uuid)
  return (
    <Layout>
      <SEO title={focusArea.shortname} lang="en" />

      <Hero
        tagTitle="Focus Area"
        title={focusArea.shortname}
        textToImageRatio={[8, 4]}
        id="focus"
      >
        <ExternalLink
          url={"https://science.nasa.gov/earth-science/"}
          id="focus-area-logo"
        >
          <Icon color={colors[NEGATIVE].text} size="huge" />
        </ExternalLink>
      </Hero>

      <PageBody id="focus">
        <InpageNav
          shortname={focusArea.shortname}
          items={[
            {
              id: "overview",
              label: "Overview",
            },
            {
              id: "focus-campaigns",
              label: "Related Campaigns",
            },
            {
              id: "focus-areas",
              label: "Focus Areas",
            },
          ]}
          path={path}
        />
        <Section id="overview" mode={POSITIVE}>
          <VisuallyHidden>
            <SectionHeader headline="Overview" id="overview" />
          </VisuallyHidden>
          <SectionContent mode={POSITIVE} columns={[1, 8]}>
            <h3>Overview</h3>

            <p data-cy="description">{focusArea.description}</p>
          </SectionContent>
          <SectionContent mode={POSITIVE} columns={[10, 3]}>
            <div
              css={`
                padding: 1rem;
                border: 1px solid hsla(0, 0%, 0%, 0.2);
              `}
            >
              {focusArea.url ? (
                <ExternalLink
                  label={`NASA's ${focusArea.shortname} Homepage`}
                  url={focusArea.url}
                  mode={POSITIVE}
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
          campaigns={focusArea.campaigns}
        />

        <Section id="focus-areas" isSpaced>
          <SectionHeader
            headline="Focus Areas"
            tagline="explore nasa earth science"
            id="focus"
          />
          <SectionContent>
            <FocusAreaGallery focusAreas={allFocusArea.nodes} size="large" />
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
  path: PropTypes.string.isRequired,
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
