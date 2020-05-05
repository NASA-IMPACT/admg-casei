import React from "react"

const ExploreCard = ({
  title = "Shortname",
  description = "Campaign Longname over 2 lines",
}) => (
  <div style={{ maxWidth: `13rem` }} data-cy="explore-card">
    <img style={{ margin: 0 }} src="https://picsum.photos/300/200" alt=""></img>
    <big style={{ fontWeight: `bold`, marginTop: `0.5rem` }}>{title}</big>
    <p>{description}</p>
  </div>
)

export default ExploreCard
