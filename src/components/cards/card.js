import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

const Card = ({ children, image, tag, footerList }) => (
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
        {image ? (
          <img src={image.url} alt={image.description} width="45" height="45" />
        ) : (
          <div
            className="placeholder"
            style={{
              borderRadius: `2.5rem`,
              backgroundColor: `#9E9E9E`,
              width: `2.5rem`,
              height: `2.5rem`,
            }}
          ></div>
        )}
        {tag && (
          <div
            style={{
              textTransform: `uppercase`,
              border: `1px solid`,
              padding: `0.25rem`,
            }}
            data-cy={`${tag.toLowerCase()}-tag`}
          >
            {tag}
          </div>
        )}
      </div>
      {children}
    </div>
    {footerList && (
      <div>
        {footerList.map((o, index) => (
          <small key={o.title} data-cy={`count${index + 1}`}>
            {index !== 0 && ` · `}
            <strong>{o.count}</strong> {o.title}
          </small>
        ))}
      </div>
    )}
  </div>
)

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  image: PropTypes.shape({
    url: PropTypes.string,
    description: PropTypes.string,
  }),
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  footerList: PropTypes.arrayOf(
    PropTypes.shape({ count: PropTypes.number, title: PropTypes.string })
  ),
}

export default Card
