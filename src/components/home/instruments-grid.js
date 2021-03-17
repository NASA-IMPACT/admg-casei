import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

export const InstrumentsGrid = ({ measurementTypes }) => {
  const other = measurementTypes.find(
    i => i.shortname.toLowerCase() === "other"
  )
  // move type "Other" to the end of the list
  measurementTypes.push(
    measurementTypes.splice(measurementTypes.indexOf(other), 1)[0]
  )

  return (
    <div
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        border: `1px solid ${colors[NEGATIVE].text}`,
      }}
    >
      {measurementTypes.map(measurementType => (
        <Link
          to="/explore"
          state={{
            selectedFilterId: measurementType.id,
            defaultExploreCategory: "instruments",
          }}
          style={{ flexGrow: 1 }}
          data-cy="instrument-type"
          key={measurementType.id}
        >
          <div
            style={{
              border: `1px solid ${colors[NEGATIVE].text}`,
              padding: `1rem`,
              textAlign: `center`,
            }}
          >
            <label>
              {measurementType.longname || measurementType.shortname}
            </label>
          </div>
        </Link>
      ))}
    </div>
  )
}

InstrumentsGrid.propTypes = {
  measurementTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
      longname: PropTypes.string,
    })
  ),
}
