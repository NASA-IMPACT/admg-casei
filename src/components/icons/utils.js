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
} from "../icons"

const icons = {
  "960ac6eb-3e79-425d-998b-8b1271aa6d5e": ({ color, size }) => (
    <AtmosphericCompositionIcon color={color} size={size} />
  ),

  "347b2275-e553-42e2-bfd5-2e077dc00a95": ({ color, size }) => (
    <CarbonCycleEcosystemsIcon color={color} size={size} />
  ),
  "b2f74ede-ac7d-4cce-8abc-6f4af227b320": ({ color, size }) => (
    <ClimateVariabilityChangeIcon color={color} size={size} />
  ),
  "1a2f4f6e-37a2-4238-95d0-123dab923322": ({ color, size }) => (
    <EarthSurfaceInteriorIcon color={color} size={size} />
  ),
  "220c5519-e743-40d2-9d42-7c9fd15b727b": ({ color, size }) => (
    <GlobalWaterEnergyCycleIcon color={color} size={size} />
  ),
  "9bacf069-912f-4302-95de-f15bc4a3784d": ({ color, size }) => (
    <WeatherIcon color={color} size={size} />
  ),
}

export function getFocusIcon(id) {
  return icons[id]
}

export const sizes = {
  tiny: { width: "30", height: "30" },
  small: { width: "60", height: "60" },
  large: { width: "120", height: "120" },
  huge: { width: "360", height: "360" },
}
