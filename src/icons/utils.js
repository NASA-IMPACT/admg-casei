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
} from "./"

const icons = {
  "Atmospheric Composition": ({ color, size }) => (
    <AtmosphericCompositionIcon color={color} size={size} />
  ),
  "Carbon Cycle & Ecosystems": ({ color, size }) => (
    <CarbonCycleEcosystemsIcon color={color} size={size} />
  ),
  "Climate Variability & Change": ({ color, size }) => (
    <ClimateVariabilityChangeIcon color={color} size={size} />
  ),
  "Earth Surface & Interior": ({ color, size }) => (
    <EarthSurfaceInteriorIcon color={color} size={size} />
  ),
  "Global Water & Energy Cycle": ({ color, size }) => (
    <GlobalWaterEnergyCycleIcon color={color} size={size} />
  ),
  Weather: ({ color, size }) => <WeatherIcon color={color} size={size} />,
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
