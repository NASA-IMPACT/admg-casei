import React, { useMemo } from "react"
import PropTypes from "prop-types"

import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { Events } from "./events"

export const Deployment = ({
  id,
  longname,
  shortname,
  aliases,
  start,
  end,
  events,
  xScale,
  update,
  yPosition,
  updateFocus,
  setSelectedDeployment,
  selectedDeployment,
  regions,
}) => {
  const xPosition = useMemo(() => {
    return xScale(new Date(start))
  }, [xScale, start])

  const width = useMemo(() => {
    return xScale(new Date(end)) - xScale(new Date(start))
  }, [xScale, start, end])

  return (
    <g
      key={id}
      onClick={() => {
        updateFocus(id, xPosition)
        setSelectedDeployment(
          selectedDeployment?.id === id
            ? null
            : {
                ...{
                  start,
                  end,
                  events,
                  id,
                  longname,
                  shortname,
                  aliases,
                  regions,
                },
              }
        )
      }}
      css={`
        cursor: pointer;
      `}
    >
      <g
        className="deployment"
        transform={`translate(${xPosition}, ${yPosition})`}
        onMouseEnter={() => update(id)}
      >
        <rect
          width={width}
          height={20}
          fill={
            selectedDeployment?.id === id || !selectedDeployment?.id
              ? colors[NEGATIVE].dataVizOne
              : colors[NEGATIVE].altText
          }
        />
      </g>

      <Events events={events} xScale={xScale} yPosition={yPosition} />
    </g>
  )
}

Deployment.propTypes = {
  id: PropTypes.string.isRequired,
  longname: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  aliases: PropTypes.array.isRequired,
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
    }).isRequired
  ),
  collection_periods: PropTypes.array,
  xScale: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  priority: PropTypes.number.isRequired,
  yPosition: PropTypes.number.isRequired,
  isFocussed: PropTypes.bool.isRequired,
  isAnyFocussed: PropTypes.bool.isRequired,
  updateFocus: PropTypes.func.isRequired,
  regions: PropTypes.array.isRequired,
  setSelectedDeployment: PropTypes.func.isRequired,
  selectedDeployment: PropTypes.string.isRequired,
}
