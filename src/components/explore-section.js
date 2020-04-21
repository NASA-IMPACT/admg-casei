import React from "react"

const ExploreSection = ({
  totalCount,
  sortOrder,
  toggleSortOrder,
  children,
}) => (
  <section>
    <header style={{ display: `flex`, justifyContent: `space-between` }}>
      <small>Showing {totalCount} campaigns</small>
      <select
        defaultValue={sortOrder}
        name="sort"
        id="sort"
        onChange={e => toggleSortOrder(e.target.value)}
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

export default ExploreSection
