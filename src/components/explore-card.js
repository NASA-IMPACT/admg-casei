import React from "react"

const ExploreCard = ({
  title = "Shortname",
  description = "Campaign Longname over 2 lines",
}) => (
  <div style={{ maxWidth: `13rem` }} data-cy="explore-card">
    <img style={{ margin: 0 }} src="https://picsum.photos/300/200" alt=""></img>
    <h2 style={{ marginTop: `0.5rem` }}>{title}</h2>
    <p>{description}</p>
  </div>
)

export default ExploreCard
