import React from "react"

import {
  BalloonIcon,
  FieldSiteIcon,
  FieldSurveyIcon,
  MooredBuoyIcon,
  PermanentLandSiteIcon,
  PermanentWaterIcon,
  VehicleIcon,
} from "../icons/static-platform-icons"

export const MOVING_PLATFORMS_COLORS = [
  "#b2df8a",
  "#33a02c",
  "#fdbf6f",
  "#ff7f00",
  "#a6cee3",
  "#1f78b4",
  "#fb9a99",
  "#e31a1c",
]

export const FALLBACK_COLOR = "#1a9b8c"

export const STATIC_PLATFORMS = [
  {
    name: "Permanent Land Site",
    color: "#FFFFD4",
    icon: <PermanentLandSiteIcon />,
  },
  { name: "Vehicle", color: "#FEE391", icon: <VehicleIcon /> },
  { name: "Balloon Launch Site", color: "#FEC44F", icon: <BalloonIcon /> },
  { name: "Field Site", color: "#EC7014", icon: <FieldSiteIcon /> },
  { name: "Field Survey", color: "#EC7014", icon: <FieldSurveyIcon /> },
  {
    name: "Permanent Water Site",
    color: "#EC7014",
    icon: <PermanentWaterIcon />,
  },
  { name: "Moored Buoy", color: "#EC7014", icon: <MooredBuoyIcon /> },
]

export const flightPathColors = platforms =>
  platforms.map((i, index) => [i, MOVING_PLATFORMS_COLORS[index]])

export const getLineColors = platforms => {
  const colors = flightPathColors(platforms)
  return [
    "match",
    ["get", "platform_name"],
    ...colors.flatMap(i => i),
    FALLBACK_COLOR,
  ]
}
