import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import { DiscoveryIcon, MetadataIcon, AccountingIcon } from "../icons"

import Layout, {
  PageBody,
  Section,
  SectionHeader,
  SectionContent,
} from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import ExternalLink from "../components/external-link"
import about from "../content/about.json"

const LinkedParagraph = () => (
  <p>
    NASA’s Airborne Data Management Group{" "}
    <ExternalLink
      url="https://earthdata.nasa.gov/esds/impact/admg"
      label="(ADMG)"
      id="about-admg"
    />{" "}
    operates within the Interagency Implementation and Advanced Concepts Team{" "}
    <ExternalLink
      url="https://earthdata.nasa.gov/esds/impact"
      label="(IMPACT)"
      id="about-impact"
    />{" "}
    at Marshall Space Flight Center, under the direction of NASA’s Earth Science
    Data Systems{" "}
    <ExternalLink
      url="https://earthdata.nasa.gov/esds"
      label="(ESDS)"
      id="about-esds"
    />{" "}
    . The primary responsibility of ADMG is to support data producers and
    archivers with the task of ensuring NASA’s airborne and field investigation
    science data are discoverable and usable by various research communities.
    Additionally, ADMG serves the various airborne data user communities by
    providing resource access and key contextual information for past and
    current NASA airborne and field investigations.
  </p>
)

const About = ({ data }) => {
  return (
    <Layout>
      <SEO title="About" lang="en" />

      <Hero
        tagline="About"
        title="NASA"
        description="conducts and supports Earth Science field investigations, including airborne campaigns, to supplement space-borne observations and advance scientific understanding and predictive capability of our home planet’s natural processes."
        textToImageRatio={[12, 0]}
        id="about"
      />

      <PageBody id="about">
        <Section id="about-inventory">
          <SectionHeader
            headline={about.aboutInventory.title}
            id="about-inventory"
          />
          <SectionContent columns={[1, 7]}>
            <p>{about.aboutInventory.definition}</p>
          </SectionContent>
          <SectionContent columns={[1, 12]}>
            <label data-cy="about-inventory-label">
              {about.aboutInventory.label}
            </label>
            <section
              css={`
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
                gap: 3rem;
              `}
              data-cy="about-inventory-objectives"
            >
              {about.aboutInventory.objectives.map(objective => (
                <div
                  css={`
                    padding: 2rem 0;
                  `}
                  key={objective.id}
                >
                  {
                    {
                      discovery: <DiscoveryIcon size="small" />,
                      metadata: <MetadataIcon size="small" />,
                      accounting: <AccountingIcon size="small" />,
                    }[objective.id]
                  }
                  <p
                    css={`
                      padding: 2rem 0;
                      font-weight: bold;
                    `}
                  >
                    {objective.header}
                  </p>
                  <small>{objective.description}</small>
                </div>
              ))}
            </section>
          </SectionContent>
        </Section>

        <Section id="about-image">
          <SectionContent columns={[1, 12]}>
            {data.bodyImage.gatsbyImg && (
              <GatsbyImage
                image={data.bodyImage.gatsbyImg.childImageSharp.gatsbyImageData}
                css={`
                  max-height: 400px;
                `}
                alt={data.bodyImage.nasaImgAlt}
              />
            )}
          </SectionContent>
        </Section>

        {about.aboutContentSections.map(aboutSection => (
          <Section id={`about-${aboutSection.id}`} key={aboutSection.id}>
            <SectionContent columns={[1, 9]}>
              <label data-cy={`about-${aboutSection.id}-label`}>
                {aboutSection.label}
              </label>
              <h2 data-cy={`about-${aboutSection.id}-headline`}>
                {aboutSection.headline}
              </h2>
            </SectionContent>
            <SectionContent columns={[1, 12]}>
              <section
                css={`
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
                  gap: 3rem;
                `}
                data-cy={`about-${aboutSection.id}-text`}
              >
                {aboutSection.paragraphs ? (
                  aboutSection.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <LinkedParagraph />
                )}
              </section>
            </SectionContent>
          </Section>
        ))}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  {
    bodyImage: nasaImagesJson(shortname: { eq: "about-body" }) {
      nasaImgAlt
      gatsbyImg {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
  }
`

About.propTypes = {
  data: PropTypes.shape({
    bodyImage: PropTypes.shape({
      nasaImgAlt: PropTypes.string.isRequired,
      gatsbyImg: PropTypes.shape({
        childImageSharp: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }),
}

export default About
