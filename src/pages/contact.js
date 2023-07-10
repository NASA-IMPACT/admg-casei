import React from "react"
import { FEEDBACK_FORM_URL } from "../utils/constants"

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
  return (
    <Layout>
      <SEO title="Contact" lang="en" />
      <PageBody id="contact">
        <h1>We appreciate your feedback!</h1>
        <Section id="contact">
          <SectionContent columns={[1, 8]}>
            <Paragraph>
              The Airborne Data Management Group{" "}
              <ExternalLink
                url="https://earthdata.nasa.gov/esds/impact/admg"
                label="ADMG"
                id=""
              />{" "}
              is responsible for the NASA CASEI inventory. Click the button
              below to send us any comments, requests, updates, or questions you
              have on CASEI content:
              <div
                css={`
                  margin-top: 16px;
                `}
              >
                <Button
                  action={() => {
                    window.open(FEEDBACK_FORM_URL, "_blank")
                  }}
                >
                  How can we improve CASEI?
                </Button>
              </div>
            </Paragraph>
            <Paragraph>
              ADMG is a project within the Interagency Implementation and
              Advanced Concepts Team{" "}
              <ExternalLink
                url="https://www.earthdata.nasa.gov/esds/impact"
                label="IMPACT"
                id=""
              />{" "}
              , supported by{" "}
              <ExternalLink
                url="https://www.earthdata.nasa.gov/esds"
                label="NASA Earth Science Data Systems"
                id=""
              />
              {` 
              and managed jointly Marshall Space Flight Center's `}
              <ExternalLink
                url="https://science.msfc.nasa.gov/earth-science-home/"
                label="Earth Science Branch"
                id=""
              />
              {`
              and the University of Alabama in Huntsville's `}
              <ExternalLink
                url="https://www.uah.edu/essc"
                label="Earth System Science Center"
                id=""
              />
              .
            </Paragraph>
            <Paragraph>
              Feedback on the design of CASEI may also be send to{" "}
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
