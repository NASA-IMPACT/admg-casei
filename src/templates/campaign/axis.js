import React, { useMemo } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

export const Axis = ({ domain, range, chartSettings }) => {
  const xScale = d3.scaleUtc().domain(domain).range(range).nice()

  const timeFormat = d3.utcFormat("%b %Y")

  const weekTicks = useMemo(() => {
    return xScale.ticks(d3.utcWeek).map(value => ({
      value,
      xOffset: xScale(value),
    }))
  }, [domain.join("-"), range.join("-")])

  const monthTicks = useMemo(() => {
    return xScale.ticks(d3.utcMonth).map(value => ({
      value,
      xOffset: xScale(value),
    }))
  }, [domain.join("-"), range.join("-")])

  const labels = useMemo(() => {
    return xScale.ticks(d3.utcMonth.every(3)).map(value => ({
      value,
      xOffset: xScale(value),
    }))
  }, [domain.join("-"), range.join("-")])

  return (
    <>
      <path
        d={[
          "M",
          range[0] - chartSettings.paddingX,
          6,
          "v",
          -6,
          "H",
          range[1] + chartSettings.paddingX,
          "v",
          6,
        ].join(" ")}
        fill="none"
        stroke="currentColor"
      />
      {weekTicks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2="6" stroke="currentColor" />
        </g>
      ))}
      {monthTicks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2="15" stroke="currentColor" />
        </g>
      ))}
      {labels.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <text
            key={value}
            fill="currentColor"
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(25px)",
            }}
          >
            {`${timeFormat(value)}`}
          </text>
        </g>
      ))}
    </>
  )
}

Axis.propTypes = {
  domain: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.any])
  ).isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  chartSettings: PropTypes.shape({
    paddingX: PropTypes.number,
  }),
}
