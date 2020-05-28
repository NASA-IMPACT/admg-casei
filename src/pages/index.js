import React from "react"
import { Link } from "gatsby"
import { Button } from "@devseed-ui/button"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome</h1>
    <p>A centralized airborne data inventory.</p>

    <Button variation="base-raised-dark" size="large">
      <Link to="/explore/campaigns">Explore airborne campaigns</Link>
    </Button>
  </Layout>
)

export default IndexPage
