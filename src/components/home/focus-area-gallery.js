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

const FocusArea = ({ id, caption }) => {
  // TODO: This mapping is currently done by shortname, as I don't trust
  // the id yet to be stable.
  const icons = {
    "Atmospheric Composition": (
      <AtmosphericCompositionIcon color={theme.type.base.color} size="small" />
    ),
    "Atmospheric Dynamics": (
      <AtmosphericDynamicsIcon color={theme.type.base.color} size="small" />
    ),
    "Carbon Cycle & Ecosystems": (
      <CarbonCycleEcosystemsIcon color={theme.type.base.color} size="small" />
    ),
    "Climate Variability & Change": (
      <ClimateVariabilityChangeIcon
        color={theme.type.base.color}
        size="small"
      />
    ),
    "Earth Surface & Interior": (
      <EarthSurfaceInteriorIcon color={theme.type.base.color} size="small" />
    ),
    "Global Water & Energy Cycle": (
      <GlobalWaterEnergyCycleIcon color={theme.type.base.color} size="small" />
    ),
    Weather: <WeatherIcon color={theme.type.base.color} size="small" />,
  }

  if (!icons[caption]) return null

  return (
    <Link
      to="/explore/campaigns"
      state={{ selectedFilterId: id }} // Pass state as props to the linked page
      style={{ textAlign: `center` }}
      data-cy="focus-area"
    >
      {icons[caption]}
      <div>{caption}</div>
    </Link>
  )
}

FocusArea.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}

const FocusAreaGallery = ({ focusAreas }) => {
  return (
    <div
      style={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fill, minmax(min(120px, 100%), 1fr))`,
        gap: `1rem`,
      }}
    >
      {focusAreas.map(focus => (
        <FocusArea key={focus.id} id={focus.id} caption={focus.shortname} />
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
}
