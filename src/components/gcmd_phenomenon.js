import React from "react"
import PropTypes from "prop-types"

function titleCase(s) {
  return s
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}

export default function GcmdPhenomenon({ gcmdPhenomenon }) {
  return (
    <div
      css={`
        display: block;
      `}
      key={gcmdPhenomenon.id}
    >
      {titleCase(gcmdPhenomenon.category)} &gt;{" "}
      {titleCase(gcmdPhenomenon.topic)} &gt; {titleCase(gcmdPhenomenon.term)}
      {[1, 2, 3].map(i =>
        gcmdPhenomenon[`variable_${i}`]
          ? " > " + titleCase(gcmdPhenomenon[`variable_${i}`])
          : ""
      )}
    </div>
  )
}

GcmdPhenomenon.propTypes = {
  gcmdPhenomenon: PropTypes.shape({
    id: PropTypes.string,
    category: PropTypes.string,
    term: PropTypes.string,
    topic: PropTypes.string,
    variable_1: PropTypes.string,
    variable_2: PropTypes.string,
    variable_3: PropTypes.string,
  }).isRequired,
}
