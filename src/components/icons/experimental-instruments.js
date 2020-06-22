import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"

export const ExperimentalInstruments = ({ color = "#FFF", size = "large" }) => (
  <svg
    viewBox={sizes[size].viewBox}
    width={sizes[size].width}
    height={sizes[size].height}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M33.59 11.383L47.741 53.51l15.957 21.65-1.766 1.624-23.299-20.38-3.853 23.276H32.4L28.55 56.403l-23.3 20.38-1.767-1.624 15.959-21.65 14.15-42.126zm2.783 43.893H30.81l2.78 16.813 2.783-16.813zM19.33 61.263h-2.608l-4.726 6.412 7.334-6.412zm31.131 0h-2.609l7.335 6.412-4.726-6.412zm-4.412-5.987h-5.044l4.088 3.574h3.59l-2.634-3.574zm-19.872 0h-5.043L18.5 58.85h3.589l4.088-3.574zM33.59 42.71L23.437 52.862h20.305L33.59 42.71zm-5.971-5.971l-4.316 12.846 8.582-8.58-4.266-4.266zm11.944 0l-4.266 4.265 8.582 8.58-4.316-12.845zm-2.428-.984h-7.087l3.543 3.543 3.544-3.543zM33.59 18.963l-4.83 14.378h9.661l-4.83-14.378zM16.113 0v2.413c-7.553 0-13.7 6.144-13.7 13.698s6.147 13.7 13.7 13.7v2.413C7.228 32.224 0 24.997 0 16.111 0 7.228 7.228 0 16.113 0zm34.954 0c8.886 0 16.114 7.228 16.114 16.111 0 8.886-7.228 16.113-16.114 16.113v-2.413c7.554 0 13.7-6.146 13.7-13.7 0-7.554-6.146-13.698-13.7-13.698V0zM16.113 5.406v2.413c-4.573 0-8.294 3.719-8.294 8.292s3.721 8.294 8.294 8.294v2.414c-5.905 0-10.707-4.805-10.707-10.708 0-5.903 4.802-10.705 10.707-10.705zm34.954 0c5.903 0 10.708 4.802 10.708 10.705 0 5.903-4.805 10.708-10.708 10.708v-2.414c4.573 0 8.295-3.72 8.295-8.294 0-4.573-3.722-8.292-8.295-8.292V5.406zM27.024 7.583V24.64h-7.706v-7.323h-3.205v-2.413h3.205V7.583h7.706zm20.84 0v7.321h3.203v2.414l-3.203-.001v7.323h-7.707V7.583h7.708zM24.612 9.996h-2.88v12.23h2.88V9.996zm20.84 0h-2.88v12.23h2.88V9.996zm-29.338.497v2.413a3.208 3.208 0 00-3.204 3.205 3.208 3.208 0 003.204 3.207v2.414a5.625 5.625 0 01-5.618-5.621 5.625 5.625 0 015.618-5.618zm34.954 0a5.625 5.625 0 015.618 5.618c0 3.099-2.52 5.62-5.618 5.62v-2.413a3.208 3.208 0 003.205-3.207 3.208 3.208 0 00-3.205-3.205v-2.413z"
    />
  </svg>
)

ExperimentalInstruments.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
}
