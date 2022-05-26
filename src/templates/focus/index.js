import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import VisuallyHidden from "@reach/visually-hidden"

import Layout, {
  PageBody,
  Section,
  SectionHeader,
  SectionContent,
} from "../../components/layout"
import SEO from "../../components/seo"
import ExternalLink from "../../components/external-link"
import InpageNav from "../../components/inpage-nav"
import RelatedCampaignsSection from "../../components/related-campaigns-section"
import FocusAreaGallery from "../../components/focus-area-gallery"

import { NEGATIVE, POSITIVE } from "../../utils/constants"
import { colors, layout } from "../../theme"
import { ArrowIcon } from "../../icons"

const FocusTemplate = ({ data: { focusArea, allFocusArea }, path }) => {
  return (
    <Layout>
      <SEO title={focusArea.shortname} lang="en" />

      <PageBody id="focus">
        <div
          data-cy="focus-hero"
          css={`
            padding: ${layout.pageMargin} 0;
          `}
        >
          <Link
            to="/"
            css={`
               {
                color: ${colors[NEGATIVE].linkText};
                cursor: pointer;
                display: flex;
                align-items: center;
                margin-bottom: 6rem;
              }
            `}
            data-cy="back-link"
          >
            <ArrowIcon color={colors[NEGATIVE].linkText} direction="left" />
            Back to Home
          </Link>

          <p
            css={`
              text-transform: uppercase;
            `}
          >
            Focus Area
          </p>

          <h1>{focusArea.shortname}</h1>
        </div>
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
                border: 1px solid ${colors[POSITIVE].border};
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
            headline="Earth Science Focus Areas"
            tagline="view other"
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
  query ($slug: String!) {
    focusArea(id: { eq: $slug }) {
      uuid
      campaigns {
        id
        shortname: short_name
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
