import React from "react"

import Layout, { PageBody } from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../components/section"
import about from "../content/about.json"

const About = () => (
  <Layout>
    <SEO title="About" />

    <Hero
      tagTitle="About"
      title="NASA airborne campaigns use the vantage point of space to explore critical questions to increase our understanding of planet earth."
      textToImageRatio={[8, 3]}
      id="about"
    />

    <PageBody>
      {Object.entries(about).map(([id, section]) => {
        return (
          <SectionBlock id={id} key={id}>
            <SectionHeader
              tagline={section.tagline}
              headline={section.headline}
            />
            <SectionContent columns={[6, 10]}>
              {section.paragraphs &&
                section.paragraphs.map((text, i) => <p key={i}>{text}</p>)}
              {section.bulleted && (
                <div>
                  {section.bulleted.map((point, i) => (
                    <React.Fragment key={i}>
                      <h3>{point.header}</h3>
                      <p>{point.content}</p>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </SectionContent>
          </SectionBlock>
        )
      })}
    </PageBody>
  </Layout>
)

export default About
