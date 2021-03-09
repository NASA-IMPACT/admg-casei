import React from "react"
import PropTypes from "prop-types"
import { sizes } from "../utils"

export default function MetadataIcon({ color = "#FFF", size = "text" }) {
  return (
    <svg
      width={sizes[size].width}
      height={sizes[size].height}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Metadata</title>
      <g fill="none" fillRule="evenodd">
        <g fill={color} fillRule="nonzero">
          <path d="M42.5 46h-37A5.505 5.505 0 010 40.5v-33C0 4.466 2.466 2 5.5 2h37C45.534 2 48 4.466 48 7.5v33c0 3.034-2.466 5.5-5.5 5.5zM5.5 5A2.503 2.503 0 003 7.5v33C3 41.878 4.122 43 5.5 43h37c1.378 0 2.5-1.122 2.5-2.5v-33C45 6.122 43.878 5 42.5 5h-37z" />
          <path d="M46.5 12h-45a1.5 1.5 0 010-3h45a1.5 1.5 0 010 3zM30.5 33a1.501 1.501 0 01-1.138-2.478L31.524 28l-2.164-2.524a1.501 1.501 0 012.278-1.954l3 3.5c.482.562.482 1.39 0 1.954l-3 3.5A1.494 1.494 0 0130.5 33zM17.5 33c-.422 0-.842-.178-1.14-.524l-3-3.5a1.501 1.501 0 010-1.954l3-3.5a1.501 1.501 0 012.278 1.954L16.476 28l2.164 2.524A1.501 1.501 0 0117.5 33zM22.5 36a1.502 1.502 0 01-1.464-1.836l3-13a1.508 1.508 0 011.798-1.126c.808.186 1.31.992 1.126 1.798l-3 13A1.496 1.496 0 0122.5 36z" />
        </g>
        <path d="M0 0h48v48H0z" />
      </g>
    </svg>
  )
}
MetadataIcon.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}
