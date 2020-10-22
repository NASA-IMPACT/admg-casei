import React from "react"
import PropTypes from "prop-types"
import { FeedbackForm } from "feedback-fish"

import Layout, {
  PageBody,
  Paragraph,
  SectionBlock,
  SectionContent,
  SectionHeader,
} from "../components/layout"
import SEO from "../components/seo"
import ExternalLink from "../components/external-link"
import Button from "../components/button"

const FishButton = props => <Button action={props.onClick}>here</Button>

FishButton.propTypes = {
  onClick: PropTypes.func.isRequired,
}

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <PageBody id="contact">
      <SectionBlock id="contact">
        <SectionHeader
          headline="We appreciate your feedback!"
          id="contact"
          isPrimary
        />
        <SectionContent columns={[1, 8]}>
          <Paragraph>
            The Airborne Data Management Group (ADMG) has gathered the content
            for this NASA inventory. ADMG is a project within the Interagency
            Implementation and Advanced Concepts Team (IMPACT). IMPACT is
            supported by NASA Earth Science Data Systems and is managed jointly
            by the Marshall Space Flight Center&apos;s Earth Science Department
            and The University of Alabama in Huntsville&apos;s Earth Systems
            Science Center (ESSC).
          </Paragraph>
          <Paragraph>
            ADMG and IMPACT staff are the point of contact for all questions,
            comments, and inquiries about CASEI and other ADMG services.
          </Paragraph>
          <Paragraph>
            To provide feedback on campaign, platform, and instrument metadata,
            contact{" "}
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
            To provide feedback about the design of CASEI click{" "}
            <FeedbackForm
              projectId="29092c37ced46e"
              triggerComponent={FishButton}
            />{" "}
            or contact{" "}
            <ExternalLink
              url="mailto:info@developmentseed.org"
              label="info@developmentseed.org"
              id=""
            />
            .
          </Paragraph>
        </SectionContent>
      </SectionBlock>
    </PageBody>
  </Layout>
)

export default Contact
