import React, { useState, useEffect } from "react"

import Layout, {
  PageBody,
  Paragraph,
  Section,
  SectionContent,
} from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/external-link"
import Button from "../components/button"

const Contact = () => {
  const [isFBMLoaded, setIsFBMLoaded] = useState(false)

  useEffect(() => {
    // ensure that feedback module is loaded and inititalized
    // (external script added via gatsby-plugin-load-script)
    if (window.feedback) {
      if (!window.feedback.showForm) {
        window.feedback.init({ showIcon: false })
      }
      setIsFBMLoaded(true)
    }
  }, [])

  return (
    <Layout>
      <SEO title="Contact" lang="en" />
      <PageBody id="contact">
        <h1>We appreciate your feedback!</h1>
        <Section id="contact">
          <SectionContent columns={[1, 8]}>
            <Paragraph>
              The Airborne Data Management Group (ADMG) has gathered the content
              for this NASA inventory. ADMG is a project within the Interagency
              Implementation and Advanced Concepts Team (IMPACT). IMPACT is
              supported by NASA Earth Science Data Systems and is managed
              jointly by the Marshall Space Flight Center&apos;s Earth Science
              Department and The University of Alabama in Huntsville&apos;s
              Earth Systems Science Center (ESSC).
            </Paragraph>
            <Paragraph>
              ADMG and IMPACT staff are the point of contact for all questions,
              comments, and inquiries about CASEI and other ADMG services.
            </Paragraph>
            <Paragraph>
              To provide feedback on campaign, platform, and instrument
              metadata, contact{" "}
              <ExternalLink
                url="https://earthdata.nasa.gov/esds/impact/admg"
                label="ADMG"
                id=""
              />
              .
            </Paragraph>
            To learn more about ADMG visit the{" "}
            <ExternalLink
              url="https://earthdata.nasa.gov/esds/impact/admg"
              label="ADMG project web pages"
              id=""
            />
            .
            <Paragraph>
              Learn more about IMPACT visit the{" "}
              <ExternalLink
                url="https://earthdata.nasa.gov/esds/impact"
                label="IMPACT web sites"
                id=""
              />
              .
            </Paragraph>
            <Paragraph>
              To provide feedback about the design of CASEI{" "}
              {isFBMLoaded && (
                <>
                  click{" "}
                  <Button
                    action={() => {
                      window.feedback.showForm()
                    }}
                  >
                    here
                  </Button>{" "}
                  or{" "}
                </>
              )}
              contact{" "}
              <ExternalLink
                url="mailto:info@developmentseed.org"
                label="info@developmentseed.org"
                id=""
              />
              .
            </Paragraph>
          </SectionContent>
        </Section>
      </PageBody>
    </Layout>
  )
}

export default Contact
