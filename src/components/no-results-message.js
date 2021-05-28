import React from "react"

export const NoResultsMessage = () => (
  <div
    css={`
      grid-column: span 3;
    `}
  >
    <h2
      css={`
        padding-bottom: 3rem;
      `}
    >
      Sorry, we couldn&apos;t find any results matching your search criteria.
    </h2>
    <h3>Search Tips</h3>
    <ul>
      <li>Try using fewer filters</li>
      <li>Check the spelling of your text input</li>
    </ul>
  </div>
)
