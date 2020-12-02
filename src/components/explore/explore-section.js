import React from "react"
import PropTypes from "prop-types"

import SortMenu from "./sort-menu"

const ExploreSection = ({
  category,
  filteredCount,
  totalCount,
  sortOrder,
  setSortOrder,
  children,
}) => {
  const filteredLabel =
    filteredCount === totalCount ? null : `${filteredCount} of `

  return (
    <section>
      <div
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          padding: `2rem 0`,
        }}
      >
        <h1
          style={{ fontSize: `small`, whiteSpace: `nowrap` }}
          data-cy="item-count"
        >
          {totalCount > 0 ? `Showing` : `No`} {filteredLabel}
          {totalCount} {category}
        </h1>

        <SortMenu
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          category={category}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(270px, 1fr))`,
          gap: `1rem`,
        }}
      >
        {children}
      </div>
    </section>
  )
}

ExploreSection.propTypes = {
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"])
    .isRequired,
  filteredCount: PropTypes.number,
  totalCount: PropTypes.number,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}

export default ExploreSection
