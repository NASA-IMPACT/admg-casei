/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import { sizes } from "./utils"
// All icons by
// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com
// License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.

export const PermanentLandSiteIcon = ({ size = "extra-tiny" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    width={sizes[size].width}
    height={sizes[size].height}
  >
    <path
      fill="currentColor"
      d="M0 488V171.3c0-26.2 15.9-49.7 40.2-59.4L308.1 4.8c7.6-3.1 16.1-3.1 23.8 0L599.8 111.9c24.3 9.7 40.2 33.3 40.2 59.4V488c0 13.3-10.7 24-24 24H568c-13.3 0-24-10.7-24-24V224c0-17.7-14.3-32-32-32H128c-17.7 0-32 14.3-32 32V488c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24zm488 24l-336 0c-13.3 0-24-10.7-24-24V432H512l0 56c0 13.3-10.7 24-24 24zM128 400V336H512v64H128zm0-96V224H512l0 80H128z"
    />
  </svg>
)

export const VehicleIcon = ({ size = "extra-tiny" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    width={sizes[size].width}
    height={sizes[size].height}
  >
    <path
      fill="currentColor"
      d="M64 104v88h96V96H72c-4.4 0-8 3.6-8 8zm482 88L465.1 96H384v96H546zm-226 0V96H224v96h96zM592 384H576c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H48c-26.5 0-48-21.5-48-48V104C0 64.2 32.2 32 72 32H192 352 465.1c18.9 0 36.8 8.3 49 22.8L625 186.5c9.7 11.5 15 26.1 15 41.2V336c0 26.5-21.5 48-48 48zm-64 0a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM160 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
    />
  </svg>
)

export const BalloonIcon = ({ size = "extra-tiny" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width={sizes[size].width}
    height={sizes[size].height}
  >
    <path
      fill="currentColor"
      d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"
    />
  </svg>
)

export const FieldSiteIcon = ({ size = "extra-tiny" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width={sizes[size].width}
    height={sizes[size].height}
  >
    <path
      fill="currentColor"
      d="M269.4 6C280.5-2 295.5-2 306.6 6l224 160c7.4 5.3 12.2 13.5 13.2 22.5l32 288c1 9-1.9 18.1-8 24.9s-14.7 10.7-23.8 10.7H464 435.8c-12.1 0-23.2-6.8-28.6-17.7L306.7 293.5c-1.7-3.4-5.1-5.5-8.8-5.5c-5.5 0-9.9 4.4-9.9 9.9V480c0 17.7-14.3 32-32 32H240 32c-9.1 0-17.8-3.9-23.8-10.7s-9-15.8-8-24.9l32-288c1-9 5.8-17.2 13.2-22.5L269.4 6z"
    />
  </svg>
)

export const FieldSurveyIcon = ({ size = "extra-tiny" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width={sizes[size].width}
    height={sizes[size].height}
  >
    <path
      fill="currentColor"
      d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z"
    />
  </svg>
)

export const PermanentWaterIcon = ({ size = "extra-tiny" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
    width={sizes[size].width}
    height={sizes[size].height}
  >
    <path
      fill="currentColor"
      d="M224 0H352c17.7 0 32 14.3 32 32h75.1c20.6 0 31.6 24.3 18.1 39.8L456 96H120L98.8 71.8C85.3 56.3 96.3 32 116.9 32H192c0-17.7 14.3-32 32-32zM96 128H480c17.7 0 32 14.3 32 32V283.5c0 13.3-4.2 26.3-11.9 37.2l-51.4 71.9c-1.9 1.1-3.7 2.2-5.5 3.5c-15.5 10.7-34 18-51 19.9H375.6c-17.1-1.8-35-9-50.8-19.9c-22.1-15.5-51.6-15.5-73.7 0c-14.8 10.2-32.5 18-50.6 19.9H183.9c-17-1.8-35.6-9.2-51-19.9c-1.8-1.3-3.7-2.4-5.6-3.5L75.9 320.7C68.2 309.8 64 296.8 64 283.5V160c0-17.7 14.3-32 32-32zm32 64v96H448V192H128zM306.5 421.9C329 437.4 356.5 448 384 448c26.9 0 55.3-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 501.7 417 512 384 512c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 437.2 165.1 448 192 448c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z"
    />
  </svg>
)

export const MooredBuoyIcon = ({ size = "extra-tiny" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width={sizes[size].width}
    height={sizes[size].height}
  >
    <path
      fill="currentColor"
      d="M180.7 4.7c6.2-6.2 16.4-6.2 22.6 0l80 80c2.5 2.5 4.1 5.8 4.6 9.3l40.2 322H55.9L96.1 94c.4-3.5 2-6.8 4.6-9.3l80-80zM152 272c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H152zM32 448H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
    />
  </svg>
)
