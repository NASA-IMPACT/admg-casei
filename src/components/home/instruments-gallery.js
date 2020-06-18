import React from "react"
import PropTypes from "prop-types"

import {
  AirborneInsitu,
  GroundInstruments,
  AirborneRemoteSensors,
  ExperimentalInstruments,
  OceanInstruments,
  FacilityInstruments,
} from "../icons"
import theme from "../../utils/theme"

const Instrument = ({ id, caption }) => {
  // TODO: This mapping is more or less random
  // we don't have icons for the existing instrument types.
  const icons = {
    "In Situ - Magnetic/Electric": (
      <AirborneInsitu color={theme.type.base.color} />
    ),
    "In Situ - Spectrometer/Radiometer": (
      <GroundInstruments color={theme.type.base.color} />
    ),
    Remote: <AirborneRemoteSensors color={theme.type.base.color} />,
    "Solar/Space": <ExperimentalInstruments color={theme.type.base.color} />,
    NID: <OceanInstruments color={theme.type.base.color} />,
    "Data Analyses": <FacilityInstruments color={theme.type.base.color} />,
  }

  if (!icons[id]) return null

  return (
    <div
      style={{ textAlign: `center` }}
      data-cy="instrument"
      className="placeholder"
    >
      {icons[id]}
      <div>{caption}</div>
    </div>
  )
}

Instrument.propTypes = {
  id: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
}

export const InstrumentsGallery = ({ instruments }) => (
  <div
    style={{
      display: `grid`,
      gridTemplateColumns: `repeat(auto-fill, minmax(min(120px, 100%), 1fr))`,
      gap: `1rem`,
    }}
  >
    {instruments.map(instrument => (
      <Instrument
        key={instrument.id}
        id={instrument.shortname}
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
