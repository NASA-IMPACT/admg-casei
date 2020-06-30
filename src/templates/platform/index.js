import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import InpageNav from "./inpage-nav"
import SectionBlock from "../../components/section/section-block"

const PlatformTemplate = ({ data: { platform } }) => {
  console.log("data", data, platform)
  return (
    <Layout>
      <InpageNav />
      <SectionBlock headline="Data" id="data" />
    </Layout>
  )
}

// export const query = graphql`
//   query($slug: String!, $platforms: [String!]) {
//     platform: platform(id: { eq: $slug }) {
//       ...?
//     }
//   }
// `

export default PlatformTemplate
