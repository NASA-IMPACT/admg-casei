import React from "react"

import Layout, { Main } from "../components/layout"
import SEO from "../components/seo"

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <Main>
      <h1>We would love to hear your feedback</h1>
      <p>
        Contact us at{" "}
        <a href="mailto:info@developmentseed.org">info@developmentseed.org</a>
      </p>
    </Main>
  </Layout>
)

export default Contact
