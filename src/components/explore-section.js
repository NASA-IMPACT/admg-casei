import React from "react"
import ExploreCard from "./explore-card"

const ExploreSection = () => (
  <section>
    <header style={{ display: `flex`, justifyContent: `space-between` }}>
      <small>Showing 300 campaigns</small>
      <select name="sort" id="sort">
        <option value="latest">latest</option>
        <option value="oldest">oldest</option>
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
      <ExploreCard title={"Test"} description={"lorem ipsum bla bla bla"} />
      {[...Array(19).keys()].map(key => (
        <ExploreCard key={key} />
      ))}
    </div>
  </section>
)

export default ExploreSection
