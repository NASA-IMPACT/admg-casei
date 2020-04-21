import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../components/layout"
import ExploreMenu from "../../components/explore-menu"
import ExploreSection from "../../components/explore-section"
import ExploreCard from "../../components/explore-card"

const Campaigns = ({ data }) => {
  const [sortOrder, toggleSortOrder] = useState("asc")
  return (
    <Layout>
      <ExploreMenu />
      <ExploreSection
        totalCount={data.all.totalCount}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
      >
        {data[sortOrder].list.map(node => (
          <Link to={`/campaign/${node.id}`} key={node.short_name}>
            <ExploreCard
              title={node.short_name}
              description={node.long_name}
            />
          </Link>
        ))}
      </ExploreSection>
    </Layout>
  )
}

export const query = graphql`
  query {
    all: allCampaignCsv {
      totalCount
    }
    asc: allCampaignCsv(sort: {order: ASC, fields: short_name}) {
      list: nodes {
        short_name
        long_name
        id
      }
    }
    desc: allCampaignCsv(sort: {order: DESC, fields: short_name}) {
      list: nodes {
        short_name
        long_name
        id
      }
    }
  }
`

export default Campaigns
