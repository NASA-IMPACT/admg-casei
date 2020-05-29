import React from "react"

const ExploreSection = ({ category, filteredCount, totalCount, children }) => {
  const filteredLabel =
    filteredCount === totalCount ? null : `${filteredCount} of `

  return (
    <section>
      <header style={{ display: `flex` }}>
        <small style={{ whiteSpace: `nowrap` }}>
          {totalCount > 0 ? `Showing` : `No`} {filteredLabel}
          {totalCount} {category}
        </small>
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
