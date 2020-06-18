import React from "react"
import PropTypes from "prop-types"

import Image from "../image"

export const Hero = ({ siteMetadata }) => (
  <div
    style={{
      display: `grid`,
      gridTemplateColumns: `3fr 5fr`,
      columnGap: `2rem`,
    }}
  >
    <div style={{ alignSelf: `end` }}>
      <div style={{ textTransform: `uppercase` }}>NASA</div>
      <h1>{siteMetadata.title}</h1>
    </div>

    <div style={{ alignSelf: `start` }}>
      <p>{siteMetadata.description}</p>
    </div>

    <div style={{ gridArea: `1 / 2 / 3 / 3` }}>
      <Image
        filename="globe.png"
        alt="a globe displaying natural features and slight cloud coverage"
      />
    </div>
  </div>
)

Hero.propTypes = {
  siteMetadata: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
}
