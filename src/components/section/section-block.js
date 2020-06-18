import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

export default function SectionBlock({ sectionTitle, id, dataCy, children }) {
  return (
    <section className="inpage-nav" id={id} data-cy={dataCy}>
      <h2>{sectionTitle}</h2>
      <div
        style={{
          display: `flex`,
          alignItems: `stretch`,
          backgroundColor: theme.color.secondary,
        }}
      >
        {children}
      </div>
    </section>
  )
}

SectionBlock.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  dataCy: PropTypes.string.isRequired,
  children: PropTypes.node,
}
