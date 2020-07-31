import React from "react"

import Layout, { PageBody } from "../components/layout"
import SEO from "../components/seo"

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <PageBody id="contact">
      <h1>We would love to hear your feedback</h1>
      <p>
        Contact us at{" "}
        <a href="mailto:info@developmentseed.org">info@developmentseed.org</a>
      </p>
    </PageBody>
  </Layout>
)

export default Contact
