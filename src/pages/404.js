import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Heading1, BodyText } from "../theme/typography"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" lang="en" />
    <Heading1>NOT FOUND</Heading1>
    <BodyText>
      You just hit a route that doesn&#39;t exist... the sadness.
    </BodyText>
  </Layout>
)

export default NotFoundPage
