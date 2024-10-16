import React from "react"
import PropTypes from "prop-types"

const ExternalLinkIcon = ({ color = "#FFF" }) => (
  <svg version="1.1" width="16" height="16" viewBox="0 0 16 16">
    <rect width="16" height="16" id="icon-bound" fill="none" />
    <path
      fill={color}
      d="M7,12h2V7H7V12z M8,4C7.448,4,7,4.448,7,5s0.448,1,1,1c0.552,0,1-0.448,1-1S8.552,4,8,4z M8,0C3.582,0,0,3.582,0,8 c0,4.418,3.582,8,8,8s8-3.582,8-8C16,3.582,12.418,0,8,0z M12.243,12.243C11.109,13.376,9.603,14,8,14s-3.109-0.624-4.243-1.757 C2.624,11.109,2,9.603,2,8s0.624-3.109,1.757-4.243C4.891,2.624,6.397,2,8,2s3.109,0.624,4.243,1.757C13.376,4.891,14,6.397,14,8 C14,9.603,13.376,11.109,12.243,12.243z"
    />
  </svg>
)

ExternalLinkIcon.propTypes = {
  color: PropTypes.string,
}

export default ExternalLinkIcon
