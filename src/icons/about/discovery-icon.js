import React from "react"
import PropTypes from "prop-types"
import { sizes } from "../utils"

export default function DiscoveryIcon({ color = "#FFF", size = "text" }) {
  return (
    <svg
      width={sizes[size].width}
      height={sizes[size].height}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Discovery</title>
      <g fill="none" fillRule="evenodd">
        <g fill={color} fillRule="nonzero">
          <path d="M7.5 9c-.777 0-1.406.63-1.406 1.406v7.5a1.406 1.406 0 002.812 0v-7.5C8.906 9.63 8.276 9 7.5 9z" />
          <path d="M35.749 25.313h5.22A7.04 7.04 0 0048 18.28v-8.25A7.04 7.04 0 0040.969 3H7.03A7.04 7.04 0 000 10.031v8.25a7.04 7.04 0 007.031 7.032h8.22c2.89 6.743 11.384 8.858 17.093 4.406l2.523 2.467a4.404 4.404 0 00.838 5.063l4.773 4.773a4.376 4.376 0 003.12 1.29A4.404 4.404 0 0048 38.907a4.378 4.378 0 00-1.29-3.115l-4.774-4.773a4.413 4.413 0 00-5.085-.825l-2.521-2.467a11.06 11.06 0 001.419-2.413zM7.031 22.5a4.224 4.224 0 01-4.218-4.219v-8.25A4.224 4.224 0 017.03 5.812H40.97a4.224 4.224 0 014.218 4.22v8.25A4.224 4.224 0 0140.97 22.5h-4.432c.967-6.754-4.256-12.75-11.037-12.75-6.776 0-12.005 5.992-11.037 12.75H7.03zM19.6 26.806a8.34 8.34 0 010-11.8 8.34 8.34 0 0111.8 0 8.34 8.34 0 010 11.8 8.34 8.34 0 01-11.8 0zm20.348 6.2l4.773 4.773a1.593 1.593 0 11-2.254 2.254l-4.773-4.773a1.583 1.583 0 01-.467-1.127c0-1.428 1.728-2.12 2.72-1.127z" />
        </g>
        <path d="M0 0h48v48H0z" />
      </g>
    </svg>
  )
}

DiscoveryIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}
