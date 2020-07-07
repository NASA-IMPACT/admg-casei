import React from "react"
import PropTypes from "prop-types"

export default function FooterList({ list }) {
  return (
    <div>
      {list.map((o, index) => (
        <small key={o.title} data-cy={`count${index + 1}`}>
          {index !== 0 && ` · `}
          <strong>{o.count}</strong> {o.title}
        </small>
      ))}
    </div>
  )
}

FooterList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({ count: PropTypes.number, title: PropTypes.string })
  ),
}
