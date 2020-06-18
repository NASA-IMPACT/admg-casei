import React from "react"
import PropTypes from "prop-types"

import ContentItem from "./content-item"

export default function ContentGroup({ contentItems }) {
  return (
    <div
      style={{
        flex: `2.618`,
        display: `grid`,
        gap: `1.5rem`,
        gridTemplateColumns: `minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)`,
        padding: `2rem`,
      }}
    >
      {contentItems.map(item => (
        <ContentItem
          key={item.label}
          label={item.label}
          info={item.info}
          type={item.type || "text"}
        />
      ))}
    </div>
  )
}

ContentGroup.propTypes = {
  contentItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      type: PropTypes.string,
    })
  ).isRequired,
}
