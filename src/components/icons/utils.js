/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react"

import {
  AtmosphericCompositionIcon,
  // AtmosphericDynamicsIcon,
  CarbonCycleEcosystemsIcon,
  ClimateVariabilityChangeIcon,
  EarthSurfaceInteriorIcon,
  GlobalWaterEnergyCycleIcon,
  WeatherIcon,
  ExclamationIcon,
} from "../icons"

const icons = {
  "df6847ab-9443-4fdb-a990-d5bf1daca3b7": ({ color, size }) => (
    <AtmosphericCompositionIcon color={color} size={size} />
  ),
  "f1bd646f-876f-4e9f-896e-f7d4571ecc00": ({ color, size }) => (
    <CarbonCycleEcosystemsIcon color={color} size={size} />
  ),
  "cd62c68f-a9f7-456a-ae15-53ef79ed5118": ({ color, size }) => (
    <ClimateVariabilityChangeIcon color={color} size={size} />
  ),
  "2231a3f1-3430-4f89-86a2-94938aa000a5": ({ color, size }) => (
    <EarthSurfaceInteriorIcon color={color} size={size} />
  ),
  "fd5c0baa-d6a4-45d7-b201-0eb2a5505dc7": ({ color, size }) => (
    <GlobalWaterEnergyCycleIcon color={color} size={size} />
  ),
  "6d719465-f32c-4808-9efb-da5ad2bae135": ({ color, size }) => (
    <WeatherIcon color={color} size={size} />
  ),
}

export function getFocusIcon(id) {
  return Object.keys(icons).includes(id)
    ? icons[id]
    : ({ color, size }) => <ExclamationIcon color={color} size={size} />
}

export const sizes = {
  text: { width: "16", height: "16" },
  tiny: { width: "30", height: "30" },
  small: { width: "60", height: "60" },
  large: { width: "120", height: "120" },
  huge: { width: "360", height: "360" },
}
