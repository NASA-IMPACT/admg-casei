import React from "react"

const ExploreCard = ({
  image = "https://picsum.photos/300/200",
  title = "Shortname",
  description = "Campaign Longname over 2 lines",
}) => (
  <div style={{ maxWidth: `13rem` }} data-cy="explore-card">
    <img
      style={{
        margin: 0,
        minWidth: `-webkit-fill-available`,
        minHeight: `8.7rem`,
        maxHeight: `8.7rem`,
        objectFit: `contain`,
      }}
      src={image}
      alt={`${title}-image`}
    ></img>
    <big style={{ fontWeight: `bold`, marginTop: `0.5rem` }}>{title}</big>
    <p>{description}</p>
  </div>
)

export default ExploreCard
