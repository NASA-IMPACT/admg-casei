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
  "e42c7970-1913-44b4-822b-8d620eef8df8": ({ color, size }) => (
    <AtmosphericCompositionIcon color={color} size={size} />
  ),

  "b31b1fd0-d090-480a-ac8b-3d48175d2a00": ({ color, size }) => (
    <CarbonCycleEcosystemsIcon color={color} size={size} />
  ),
  "43bc862a-ece2-427c-ad5f-368466d3bc98": ({ color, size }) => (
    <ClimateVariabilityChangeIcon color={color} size={size} />
  ),
  "e6a41072-65fc-411b-8e51-1dd01cd7dd17": ({ color, size }) => (
    <EarthSurfaceInteriorIcon color={color} size={size} />
  ),
  "2a9bec35-4fe5-4177-8443-d11f441310b3": ({ color, size }) => (
    <GlobalWaterEnergyCycleIcon color={color} size={size} />
  ),
  "0ba119ec-7851-4546-8708-5ea3883e0a54": ({ color, size }) => (
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
