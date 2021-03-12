import React from "react"
import PropTypes from "prop-types"

export default function CardFooterItem({ title, count, index }) {
  return (
    <small
      key={title}
      css={`
        padding-right: 0.25rem;
        white-space: nowrap;
      `}
      data-cy={`count${index + 1}`}
    >
      {(index == 1 || index == 3) && ` · `}
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
