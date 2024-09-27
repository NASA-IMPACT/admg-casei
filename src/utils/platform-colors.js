import React from "react"

import {
  BalloonIcon,
  FieldSiteIcon,
  FieldSurveyIcon,
  MooredBuoyIcon,
  PermanentLandSiteIcon,
  PermanentWaterSiteIcon,
  VehicleIcon,
  ShipIcon,
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
    mapIcon: "PermanentLandSiteIcon",
  },
  {
    name: "Vehicle",
    color: "#FEE391",
    icon: <VehicleIcon />,
    mapIcon: "VehicleIcon",
  },
  {
    name: "Balloon Launch Site",
    color: "#FEC44F",
    icon: <BalloonIcon />,
    mapIcon: "BalloonIcon",
  },
  {
    name: "Field Site",
    color: "#FE9929",
    icon: <FieldSiteIcon />,
    mapIcon: "FieldSiteIcon",
  },
  {
    name: "Field Survey",
    color: "#EC7014",
    icon: <FieldSurveyIcon />,
    mapIcon: "FieldSurveyIcon",
  },
  {
    name: "Permanent Water Site",
    color: "#CC4C02",
    icon: <PermanentWaterSiteIcon />,
    mapIcon: "PermanentWaterSiteIcon",
  },
  {
    name: "Moored Buoy",
    color: "#8C2D04",
    icon: <MooredBuoyIcon />,
    mapIcon: "MooredBuoyIcon",
  },
  {
    name: "Ship",
    color: "#F2290A",
    icon: <ShipIcon />,
    mapIcon: "ShipIcon",
  },
]

export const flightPathColors = platforms =>
  platforms.map((i, index) => [i, MOVING_PLATFORMS_COLORS[index]])

const hex2rgb = hex => hex.match(/[0-9a-f]{2}/g).map(x => parseInt(x, 16))

export const getLineColorToDeckGL = index => {
  if (index === -1) return hex2rgb(FALLBACK_COLOR)
  const color = MOVING_PLATFORMS_COLORS[index]
  // converts from HEX to RGB
  console.log(hex2rgb)
  return hex2rgb(color)
}

export const getLineColors = platforms => {
  const colors = flightPathColors(platforms)
  return [
    "match",
    ["get", "platform_name"],
    ...colors.flatMap(i => i),
    FALLBACK_COLOR,
  ]
}

export const getStaticIcons = () => {
  const icons = STATIC_PLATFORMS.map(i => [i.name, i.mapIcon])
  return [
    "match",
    ["get", "platform_name"],
    ...icons.flatMap(i => i),
    "BalloonIcon", // fallback icon
  ]
}

export const getIconColors = () => {
  const colors = STATIC_PLATFORMS.map(i => [i.name, i.color])
  return [
    "match",
    ["get", "platform_name"],
    ...colors.flatMap(i => i),
    "#fff", // fallback color
  ]
}
