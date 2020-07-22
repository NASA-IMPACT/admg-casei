import React from "react"

import Layout from "../components/layout"
import Hero from "../components/hero"
import { SectionBlock } from "../components/section"
import about from "../content/about.json"

const About = () => (
  <Layout>
    <Hero
      tagTitle="About"
      title="NASA airborne campaigns use the vantage point of space to explore critical questions to increase our understanding of planet earth."
      textToImageRatio={[8, 3]}
      id="about"
    ></Hero>

    {Object.entries(about).map(([id, section]) => {
      return (
        <SectionBlock
          tagline={section.tagline}
          headline={section.headline}
          withText
          id={id}
          key={id}
        >
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
        </SectionBlock>
      )
    })}
  </Layout>
)

export default About
