import React from "react"
import PropTypes from "prop-types"
import VisuallyHidden from "@reach/visually-hidden"
import { useLocation } from "@reach/router"

import Layout, { PageBody } from "../layout"
import SEO from "../seo"
import ExploreMenu from "./explore-menu"

export default function ExploreLayout({ filteredCount, children }) {
  const location = useLocation()

  // pathname is "/explore/:selectedCategory"
  const selectedCategory = location.pathname.split("/")[2]

  return (
    <Layout>
      <SEO title="Explore" lang="en" />
      <PageBody id="explore">
        <VisuallyHidden>
          <h1 data-cy={`h1-${selectedCategory}`}>Explore {selectedCategory}</h1>
        </VisuallyHidden>

        <ExploreMenu
          selectedCategory={selectedCategory}
          filteredCount={{
            campaigns: filteredCount?.["campaigns"],
            platforms: filteredCount?.["platforms"],
            instruments: filteredCount?.["instruments"],
          }}
        />

        {children}
      </PageBody>
    </Layout>
  )
}

ExploreLayout.propTypes = {
  filteredCount: PropTypes.shape({
    campaigns: PropTypes.number.isRequired,
    platforms: PropTypes.number.isRequired,
    instruments: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
