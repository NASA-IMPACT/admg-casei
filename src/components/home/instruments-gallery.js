import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import {
  AirborneInsitu,
  GroundInstruments,
  AirborneRemoteSensors,
  ExperimentalInstruments,
  OceanInstruments,
  FacilityInstruments,
} from "../icons"
import theme from "../../utils/theme"

const Instrument = ({ id, shortname, caption }) => {
  // TODO: This mapping is more or less random
  // we don't have icons for the existing instrument types.
  const icons = {
    "In Situ - Magnetic/Electric": (
      <AirborneInsitu color={theme.color.base} size="medium" />
    ),
    "In Situ - Spectrometer/Radiometer": (
      <GroundInstruments color={theme.color.base} size="medium" />
    ),
    Remote: <AirborneRemoteSensors color={theme.color.base} size="medium" />,
    "Solar/Space": (
      <ExperimentalInstruments color={theme.color.base} size="medium" />
    ),
    NID: <OceanInstruments color={theme.color.base} size="medium" />,
    "Data Analyses": (
      <FacilityInstruments color={theme.color.base} size="medium" />
    ),
  }

  if (!icons[shortname]) return null

  return (
    <Link
      style={{ textAlign: `center` }}
      data-cy="instrument"
      to="/explore/instruments"
      state={{ selectedFilterId: id }}
    >
      {icons[shortname]}
      <div>{caption}</div>
    </Link>
  )
}

Instrument.propTypes = {
  id: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}

export const InstrumentsGallery = ({ instruments }) => (
  <div
    style={{
      display: `grid`,
      gridTemplateColumns: `repeat(5, 1fr)`,
      gap: `1rem`,
    }}
  >
    {instruments.map(instrument => (
      <Instrument
        key={instrument.id}
        id={instrument.id}
        shortname={instrument.shortname}
        caption={instrument.longname}
      />
    ))}
  </div>
)

InstrumentsGallery.propTypes = {
  instruments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
      longname: PropTypes.string,
    })
  ),
}
