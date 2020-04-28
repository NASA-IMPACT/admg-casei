import React from "react"

import FilterChip from "./filter-chip"

const ExploreSection = ({
  category,
  filters = [],
  removeFilter,
  filteredCount,
  totalCount,
  sortOrder,
  toggleSortOrder,
  children,
}) => {
  const filteredLabel =
    filteredCount === totalCount ? null : `${filteredCount} of `

  return (
    <section>
      <header style={{ display: `flex`, justifyContent: `space-between` }}>
        <div style={{ display: `flex` }}>
          <small style={{ whiteSpace: `nowrap` }}>
            {totalCount > 0 ? `Showing` : `No`} {filteredLabel}
            {totalCount} {category}
          </small>
          <div style={{ display: `flex`, flexWrap: `wrap` }}>
            {filters.map((f) => (
              <FilterChip
                key={f}
                id={f}
                label={f}
                removeFilter={removeFilter}
              />
            ))}
          </div>
        </div>
        <select
          defaultValue={sortOrder}
          name="sort"
          id="sort"
          onChange={(e) => toggleSortOrder(e.target.value)}
          style={{ height: `2rem` }}
        >
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `1fr 1fr 1fr 1fr`,
          gap: `1rem`,
          margin: `1rem`,
          justifyItems: `center`,
        }}
      >
        {children}
      </div>
    </section>
  )
}

export default ExploreSection
