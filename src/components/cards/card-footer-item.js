import React from "react"
import PropTypes from "prop-types"

export default function CardFooterItem({ title, count, index }) {
  return (
    <small
      key={title}
      style={{
        whiteSpace: `nowrap`,
      }}
      data-cy={`count${index + 1}`}
    >
      {index !== 0 && ` · `}
      <strong>{count}</strong> {title}
      {count !== 1 && "s"}
    </small>
  )
}

CardFooterItem.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  index: PropTypes.number,
}
