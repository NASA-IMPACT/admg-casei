import React from "react"
import Layout, { PageBody, SectionContent } from "../components/layout"
import SEO from "../components/seo"

export default function UserGuide() {
  return (
    <Layout>
      <SEO title="User Guide" lang="en" />
      <PageBody id="faq">
        <h1>User Guide</h1>
        <SectionContent columns={[1, 8]}>
          <h2
            css={`
              margin-top: 2rem;
            `}
          >
            Placeholder
          </h2>
          <p>Test</p>
        </SectionContent>
      </PageBody>
    </Layout>
  )
}
