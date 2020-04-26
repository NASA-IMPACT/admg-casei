import React from "react"

import Layout from "../../components/layout"
import ExploreMenu from "../../components/explore-menu"
import ExploreSection from "../../components/explore-section"

const Instruments = () => (
  <Layout>
    <ExploreMenu />
    <ExploreSection category="instruments" />
  </Layout>
)

export default Instruments
