import React from "react"

const ExploreSection = ({ category, filteredCount, totalCount, children }) => {
  const filteredLabel =
    filteredCount === totalCount ? null : `${filteredCount} of `

  return (
    <section>
      <div style={{ display: `flex` }}>
        <h1
          style={{ fontSize: `small`, whiteSpace: `nowrap` }}
          data-cy="item-count"
        >
          {totalCount > 0 ? `Showing` : `No`} {filteredLabel}
          {totalCount} {category}
        </h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, 271px)`,
          gap: `1rem`,
        }}
      >
        {children}
      </div>
    </section>
  )
}

export default ExploreSection
