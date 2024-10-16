import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { getFocusIcon } from "../icons/utils"
import { NEGATIVE } from "../utils/constants"
import { colors, breakpoints } from "../theme"

const FocusArea = ({ id, shortname, caption, size }) => {
  const Icon = getFocusIcon(shortname)

  return (
    <Link
      to={`/focus/${shortname}`}
      state={{ selectedFilterId: id }} // Pass state as props to the linked page
      css={`
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-column: span 1;
        @media screen and (max-width: ${breakpoints["md"]}) {
          grid-column: span 2;
        }
        @media screen and (max-width: ${breakpoints["sm"]}) {
          grid-column: span 3;
        }
        gap: 1rem;
      `}
      data-cy="focus-area"
    >
      <Icon color={colors[NEGATIVE].text} size={size} />
      <label color={colors[NEGATIVE].text}>{caption}</label>
    </Link>
  )
}

FocusArea.propTypes = {
  id: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  size: PropTypes.string,
}

const FocusAreaGallery = ({ focusAreas, size = "large", isCompact }) => {
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: repeat(${isCompact ? 2 : 6}, 1fr);
        justify-items: center;
        gap: 2rem;
        padding-top: 1rem;
      `}
    >
      {focusAreas.map(focus => (
        <FocusArea
          key={focus.id}
          id={focus.id}
          shortname={focus.shortname}
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
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  size: PropTypes.string,
  isCompact: PropTypes.bool,
}
