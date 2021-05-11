import React from "react"
import PropTypes from "prop-types"

const ExploreSection = ({ children }) => {
  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(15rem, 1fr))`,
          gap: `1.75rem`,
        }}
      >
        {children}
      </div>
    </section>
  )
}

ExploreSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
}

export default ExploreSection
