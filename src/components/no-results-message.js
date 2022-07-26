import React from "react"

export const NoResultsMessage = () => (
  <div
    css={`
      grid-column: span 3;
    `}
  >
    <h2>No results found in the CASEI metadata inventory&mdash;yet!</h2>
    <p
      css={`
        padding-bottom: 3rem;
      `}
    >
      We are constantly adding curated metadata to the inventory, so please
      check back soon!
    </p>
    <h3>Search Tips</h3>
    <ul>
      <li>Try using fewer filters</li>
      <li>Check the spelling of your text input</li>
    </ul>
  </div>
)
