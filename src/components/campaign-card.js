import React from "react"

const CampaignCard = ({
  ongoing = false,
  shortname = "Shortname",
  longname = "Campaign Longname over 2 lines",
  daterange = "2012-2015",
  region = "North America",
  countCollectionPeriods = 0,
  countDataProducts = 0,
}) => (
  <div
    style={{
      backgroundColor: `#303641`,
      boxShadow: `rgba(68, 63, 63, 0.08) 0px -1px 1px 0px, rgba(68, 63, 63, 0.08) 0px 2px 6px 0px`,
      padding: `1rem`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `space-between`,
      height: `100%`,
    }}
    data-cy="explore-card"
  >
    <div style={{ marginBottom: `2rem` }}>
      <div
        style={{
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `center`,
          margin: `0.5rem 0 2rem 0`,
        }}
      >
        <div
          className="placeholder"
          style={{
            borderRadius: `2.5rem`,
            backgroundColor: `#9E9E9E`,
            width: `2.5rem`,
            height: `2.5rem`,
          }}
        ></div>
        {ongoing && (
          <div
            style={{
              textTransform: `uppercase`,
              border: `1px solid`,
              padding: `0.25rem`,
            }}
            data-cy="ongoing-tag"
          >
            ongoing
          </div>
        )}
      </div>
      <big
        style={{ fontWeight: `bold`, marginTop: `0.5rem` }}
        data-cy="shortname"
      >
        {shortname}
      </big>
      <p data-cy="longname">{longname}</p>
      <div>
        <small data-cy="daterange">{daterange}</small>
      </div>
      <div>
        <small data-cy="region">{region}</small>
      </div>
    </div>
    <div>
      <small data-cy="count1">
        <strong>{countCollectionPeriods}</strong> Collection Periods
      </small>{" "}
      ·{" "}
      <small data-cy="count2">
        <strong>{countDataProducts}</strong> Data Products
      </small>
    </div>
  </div>
)

export default CampaignCard
