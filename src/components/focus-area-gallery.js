import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Label from "./label"
import { getFocusIcon } from "../icons/utils"
import theme from "../utils/theme"

const FocusArea = ({ id, caption, size }) => {
  const Icon = getFocusIcon(id)

  return (
    <Link
      to={`/focus/${id}`}
      state={{ selectedFilterId: id }} // Pass state as props to the linked page
      style={{ textAlign: `center` }}
      data-cy="focus-area"
    >
      <Icon color={theme.color.base} size={size} />
      <Label id="focus-area-icons" color={theme.color.base}>
        {caption}
      </Label>
    </Link>
  )
}

FocusArea.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  size: PropTypes.string,
}

const FocusAreaGallery = ({ focusAreas, size = "large" }) => {
  return (
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(${focusAreas.length}, 1fr)`,
        gap: `1rem`,
        paddingTop: `1rem`,
      }}
    >
      {focusAreas.map(focus => (
        <FocusArea
          key={focus.id}
          id={focus.id}
          caption={focus.shortname}
          size={size}
        />
      ))}
    </div>
  )
}

export default FocusAreaGallery

FocusAreaGallery.propTypes = {
  focusAreas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
      longname: PropTypes.string,
    })
  ),
  size: PropTypes.string,
}
