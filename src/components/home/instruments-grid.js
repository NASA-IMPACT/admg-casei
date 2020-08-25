import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import theme from "../../utils/theme"

export const InstrumentsGrid = ({ instrumentTypes }) => {
  const other = instrumentTypes.find(i => i.shortname.toLowerCase() === "other")
  // move type "Other" to the end of the list
  instrumentTypes.push(
    instrumentTypes.splice(instrumentTypes.indexOf(other), 1)[0]
  )

  return (
    <div
      style={{
        display: `flex`,
        flexWrap: `wrap`,
        border: `1px solid ${theme.color.base}`,
      }}
    >
      {instrumentTypes.map(instrumentType => (
        <Link
          to="/explore/instruments"
          state={{ selectedFilterId: instrumentType.id }} // Pass state as props to the linked page
          style={{ flexGrow: 1 }}
          data-cy="instrument-type"
          key={instrumentType.id}
        >
          <div
            style={{
              border: `1px solid ${theme.color.base}`,
              padding: `1rem`,
              textAlign: `center`,
            }}
          >
            {instrumentType.longname || instrumentType.shortname}
          </div>
        </Link>
      ))}
    </div>
  )
}

InstrumentsGrid.propTypes = {
  instrumentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
      longname: PropTypes.string,
    })
  ),
}
