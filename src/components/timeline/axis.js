import React, { useMemo } from "react"
import PropTypes from "prop-types"
import * as d3 from "d3"

export const Axis = ({ domain, range, chartSettings, xScale, labelFormat }) => {
  const dependency = `${domain.join("-")}, ${range.join("-")}`
  const timeFormat =
    labelFormat == "month" ? d3.utcFormat("%b %Y") : d3.utcFormat("%Y")

  // const weekTicks = useMemo(() => {
  //   return xScale.ticks(d3.utcWeek).map(value => ({
  //     value,
  //     xOffset: xScale(value),
  //   }))
  // }, [dependency])

  const monthTicks = useMemo(() => {
    return xScale.ticks(d3.utcMonth).map(value => ({
      value,
      xOffset: xScale(value),
    }))
  }, [dependency])

  const labels = [
    { value: domain[0], xOffset: 0 },
    { value: domain[1], xOffset: xScale(domain[1]) },
  ]

  // useMemo(() => {
  //   return xScale.ticks(d3.utcMonth).map(value => ({
  //     value,
  //     xOffset: xScale(value),
  //   }))
  // }, [dependency])

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
      {/* {weekTicks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2="6" stroke="currentColor" />
        </g>
      ))} */}
      {monthTicks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line y2="7" stroke="currentColor" />
        </g>
      ))}
      {labels.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <text
            fill="currentColor"
            style={{
              fontSize: "14px",
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
  xScale: PropTypes.any,
  labelFormat: PropTypes.oneOf(["year, month"]).required,
}
