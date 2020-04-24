import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../components/layout"
import ExploreMenu from "../../components/explore-menu"
import ExploreSection from "../../components/explore-section"
import ExploreCard from "../../components/explore-card"

const Campaigns = ({ data }) => {
  const [sortOrder, toggleSortOrder] = useState("asc")
  const [filters, setFilter] = useState([])

  const addFilter = id => setFilter([...filters, id])
  const removeFilter = id => setFilter(filters.filter(f => f !== id))

  const list = data[sortOrder].list.filter(campaign =>
    filters.length === 0
      ? true
      : filters.every(
          f => campaign.season.includes(f) || campaign.focus.includes(f)
        )
  )

  return (
    <Layout>
      <ExploreMenu
        filters={filters}
        addFilter={addFilter}
        removeFilter={removeFilter}
      />
      <ExploreSection
        filters={filters}
        removeFilter={removeFilter}
        filteredCount={list.length}
        totalCount={data.all.totalCount}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
      >
        {list.map(node => (
          <Link to={`/campaign/${node.id}`} key={node.shortname}>
            <ExploreCard title={node.shortname} description={node.longname} />
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
    asc: allCampaignCsv(sort: { order: ASC, fields: Campaign_Shortname }) {
      list: nodes {
        shortname: Campaign_Shortname
        longname: Campaign_Longname
        id
        season: Season_s__of_Study
        focus: NASA_Earth_Science_Focus_Areas
      }
    }
    desc: allCampaignCsv(sort: { order: DESC, fields: Campaign_Shortname }) {
      list: nodes {
        shortname: Campaign_Shortname
        longname: Campaign_Longname
        id
        season: Season_s__of_Study
        focus: NASA_Earth_Science_Focus_Areas
      }
    }
  }
`

export default Campaigns
