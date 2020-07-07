import React from "react"
import PropTypes from "prop-types"

import Tag from "./tag"
import theme from "../../utils/theme"

const Card = ({ children, tag }) => (
  <div
    style={{
      backgroundColor: theme.color.secondary,
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
        {tag && <Tag tagName={tag} />}
      </div>
      {children}
    </div>
  </div>
)

Card.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

export default Card
