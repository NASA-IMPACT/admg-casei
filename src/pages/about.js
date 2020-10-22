import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout, {
  PageBody,
  SectionBlock,
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
      id="about-impact"
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
      <SEO title="About" />

      <Hero
        tagTitle="About"
        title="NASA conducts and supports Earth Science field investigations, including airborne campaigns, to supplement space-borne observations and advance scientific understanding and predictive capability of our home planet’s natural processes."
        textToImageRatio={[12, 0]}
        backgroundImage={data.heroImage}
        id="about"
      />

      <PageBody id="about">
        {Object.entries(about).map(([id, section]) => {
          return (
            <SectionBlock id={id} key={id}>
              <SectionHeader
                tagline={section.tagline}
                headline={section.headline}
                id={id}
              />
              <SectionContent columns={[6, 10]}>
                {section.paragraphs &&
                  section.paragraphs.map((text, i) => <p key={i}>{text}</p>)}
                {section.bulleted && (
                  <div>
                    <h2>{section.bulletTitle}</h2>
                    {section.bulleted.map((point, i) => (
                      <div style={{ paddingLeft: `4rem` }} key={i}>
                        <h3>{point.header}</h3>
                        <p>{point.content}</p>
                      </div>
                    ))}
                  </div>
                )}
                {section.paragraphLinks && <LinkedParagraph />}
              </SectionContent>
            </SectionBlock>
          )
        })}
      </PageBody>
    </Layout>
  )
}

export const query = graphql`
  query {
    heroImage: nasaImagesJson(shortname: { eq: "About" }) {
      nasaImgAlt
      nasaImg {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

About.propTypes = {
  data: PropTypes.shape({
    heroImage: PropTypes.shape({
      nasaImgAlt: PropTypes.string.isRequired,
      nasaImg: PropTypes.shape({
        childImageSharp: PropTypes.object.isRequired,
      }).isRequired,
    }).isRequired,
  }),
}

export default About
