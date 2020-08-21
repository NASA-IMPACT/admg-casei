import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import {
  AtmosphericCompositionIcon,
  AtmosphericDynamicsIcon,
  CarbonCycleEcosystemsIcon,
  ClimateVariabilityChangeIcon,
  EarthSurfaceInteriorIcon,
  GlobalWaterEnergyCycleIcon,
  WeatherIcon,
} from "../icons"
import theme from "../../utils/theme"
import Label from "../label"

const FocusArea = ({ id, caption, size }) => {
  // TODO: This mapping is currently done by shortname, as I don't trust
  // the id yet to be stable.
  const icons = {
    "Atmospheric Composition": (
      <AtmosphericCompositionIcon color={theme.color.base} size={size} />
    ),
    "Atmospheric Dynamics": (
      <AtmosphericDynamicsIcon color={theme.color.base} size={size} />
    ),
    "Carbon Cycle & Ecosystems": (
      <CarbonCycleEcosystemsIcon color={theme.color.base} size={size} />
    ),
    "Climate Variability & Change": (
      <ClimateVariabilityChangeIcon color={theme.color.base} size={size} />
    ),
    "Earth Surface & Interior": (
      <EarthSurfaceInteriorIcon color={theme.color.base} size={size} />
    ),
    "Global Water & Energy Cycle": (
      <GlobalWaterEnergyCycleIcon color={theme.color.base} size={size} />
    ),
    Weather: <WeatherIcon color={theme.color.base} size={size} />,
  }

  if (!icons[caption]) return null

  return (
    <Link
      to="/explore/campaigns" // TODO: where should these link to?
      state={{ selectedFilterId: id }} // Pass state as props to the linked page
      style={{ textAlign: `center` }}
      data-cy="focus-area"
    >
      {icons[caption]}
      <Label id="focus-area-icons" color={theme.color.base}>
        {caption}
      </Label>
    </Link>
  )
}

FocusArea.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  size: PropTypes.string,
}

const FocusAreaGallery = ({ focusAreas, size = "large" }) => {
  return (
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fill, minmax(min(120px, 100%), 1fr))`,
        gap: `1rem`,
        paddingTop: `1rem`,
      }}
    >
      {focusAreas.map(focus => (
        <FocusArea
          key={focus.id}
          id={focus.id}
          caption={focus.shortname}
          size={size}
        />
      ))}
    </div>
  )
}

export default FocusAreaGallery

FocusAreaGallery.propTypes = {
  focusAreas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
      longname: PropTypes.string,
    })
  ),
  size: PropTypes.string,
}
