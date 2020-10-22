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
import Hero from "../../components/hero"
import ExternalLink from "../../components/external-link"
import FocusAreaGallery from "../../components/focus-area-gallery"
import theme from "../../utils/theme"
import { getFocusIcon } from "../../components/icons/utils"

const FocusTemplate = ({ data }) => {
  const Icon = getFocusIcon(data.focusArea.uuid)
  return (
    <Layout>
      <Hero
        tagTitle="Focus Area"
        title={data.focusArea.shortname}
        textToImageRatio={[8, 4]}
        id="focus"
      >
        <Icon color={theme.color.base} size="huge" />
      </Hero>

      <PageBody id="focus">
        <Section id="overview">
          <SectionHeader headline="Overview" id={data.focusArea.uuid} />
          <SectionContent columns={[1, 8]} minHeight={`12rem`}>
            <Paragraph data-cy="description">
              {data.focusArea.description}
            </Paragraph>
          </SectionContent>
          <SectionContent columns={[10, 3]}>
            <ul style={{ margin: 0, listStyle: `none` }} data-cy="link-list">
              <li
                style={{
                  padding: `1rem`,
                  border: `1px solid ${theme.color.base}`,
                }}
              >
                {data.focusArea.url ? (
                  <Paragraph>
                    <ExternalLink
                      label={"NASA SMD Homepage"}
                      url={data.focusArea.url}
                      id="focus"
                    />
                  </Paragraph>
                ) : (
                  <Paragraph data-cy="focus-link">
                    no Focus Area url available
                  </Paragraph>
                )}
              </li>
            </ul>
          </SectionContent>
        </Section>

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
      campaigns
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
      campaigns: PropTypes.arrayOf(PropTypes.string).isRequired,
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
