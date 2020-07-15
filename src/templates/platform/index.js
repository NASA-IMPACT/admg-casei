import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import Header from "./header"
import Overview from "./overview"
import Resources from "./resources"

export default function PlatformTemplate({ data: { platform } }) {
  console.log("data", platform)
  return (
    <Layout>
      <Header
        shortname={platform.shortname}
        longname={platform.longname}
        textToImageRatio={[3, 5]}
      />
      <div
        style={{
          display: `grid`,
          gridTemplateColumns: `5fr 3fr`,
          columnGap: `2rem`,
        }}
      >
        <div>
          <Overview description={platform.description} />
        </div>
        <Resources shortname={platform.shortname} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    platform: platform(id: { eq: $slug }) {
      ...platformHeaderFields
      ...platformOverviewFields
    }
  }
`

PlatformTemplate.propTypes = {
  data: PropTypes.shape({
    platform: PropTypes.shape({
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  }),
}
