import React from "react"
import PropTypes from "prop-types"
import Spinner from "react-spinkit"

import theme from "../../utils/theme"

const ExploreSection = ({ isLoading, children }) => {
  return (
    <section>
      {isLoading ? (
        <div
          style={{ display: `flex`, justifyContent: `space-around` }}
          data-cy="loading-indicator"
        >
          <Spinner name="cube-grid" color={theme.color.base} />
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(270px, 1fr))`,
            gap: `1rem`,
          }}
        >
          {children}
        </div>
      )}
    </section>
  )
}

ExploreSection.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}

export default ExploreSection
