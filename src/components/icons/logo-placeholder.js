import React from "react"
import PropTypes from "prop-types"

import theme from "../../utils/theme"

export const LogoPlaceholder = () => (
  <svg width="100px" height="100px" viewBox="0 0 100 100">
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Artboard" transform="translate(-135.000000, -97.000000)">
        <g id="placeholder" transform="translate(135.000000, 97.000000)">
          <circle id="Oval" fill="#0C1520" cx="50" cy="50" r="50"></circle>
          <text
            id="LOGO"
            fontFamily={theme.type.base.family}
            fontSize="22"
            fontWeight="normal"
            fill={theme.type.base.color}
          >
            <tspan x="23.9931641" y="57">
              LOGO
            </tspan>
          </text>
        </g>
      </g>
    </g>
  </svg>
)

LogoPlaceholder.propTypes = {
  color: PropTypes.string,
}
