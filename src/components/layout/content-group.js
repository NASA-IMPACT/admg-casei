import React from "react"
import PropTypes from "prop-types"
import { breakpoints } from "../../theme"
export default function ContentGroup({ children }) {
  return (
    <div
      css={`
        flex: 2.618;
        display: grid;
        gap: 1rem;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        padding: 1rem;
        @media screen and (min-width: ${breakpoints["sm"]}) {
          gap: 1.5rem;
          padding: 2rem;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
        }
      `}
    >
      {children}
    </div>
  )
}

ContentGroup.propTypes = {
  children: PropTypes.node.isRequired,
}
