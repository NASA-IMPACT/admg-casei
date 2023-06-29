import { Link } from "gatsby"
import React from "react"
import { colors } from "../theme"
import { NEGATIVE } from "../utils/constants"

export const NoResultsMessage = () => (
  <div
    css={`
      grid-column: span 3;
    `}
  >
    <h2>No results found in the CASEI metadata inventory&mdash;yet!</h2>
    <div
      css={`
        padding-bottom: 3rem;
      `}
    >
      <Link
        to={"/explore/upcoming"}
        css={`
           {
            color: ${colors[NEGATIVE].linkText};
            cursor: pointer;
          }
        `}
        data-cy="back-link"
      >
        We are constantly adding curated metadata to the inventory, so please
        check back soon!
      </Link>
    </div>
    <h3>Search Tips</h3>
    <ul>
      <li>Try using fewer filters</li>
      <li>Check the spelling of your text input</li>
    </ul>
  </div>
)
