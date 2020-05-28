import React from "react"

import Layout from "../../components/layout"
import ExploreMenu from "../../components/explore-menu"
import ExploreSection from "../../components/explore-section"

const Platforms = () => (
  <Layout>
    <ExploreMenu />
    <ExploreSection category="platforms" />
  </Layout>
)

export default Platforms
