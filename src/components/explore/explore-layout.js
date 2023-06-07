import React from "react"
import PropTypes from "prop-types"
import VisuallyHidden from "@reach/visually-hidden"

import Layout, { PageBody } from "../layout"
import SEO from "../seo"
import ExploreMenu from "./explore-menu"

export default function ExploreLayout({ category, filteredCount, children }) {
  return (
    <Layout>
      <SEO title="Explore" lang="en" />
      <PageBody id="explore">
        <VisuallyHidden>
          <h1 data-cy={`h1-${category}`}>Explore {category}</h1>
        </VisuallyHidden>

        <ExploreMenu
          selectedCategory={category}
          filteredCount={{
            campaigns: filteredCount?.["campaigns"],
            platforms: filteredCount?.["platforms"],
            instruments: filteredCount?.["instruments"],
            products: filteredCount?.["products"],
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
    products: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  category: PropTypes.string.isRequired,
}
