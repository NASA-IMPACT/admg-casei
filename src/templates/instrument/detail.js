import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Table from "../../components/table"
import Label from "../../components/label"

export function About({
  id,
  radiometricFrequency,
  temporalResolution,
  spatialResolution,
}) {
  return (
    <Table
      heading="About the instrument"
      tableData={[
        {
          title: "Radiometric Frequency of Measurement",
          content: radiometricFrequency,
        },
        {
          title: "Temporal Resolution",
          content: temporalResolution,
        },
        { title: "Spatial Resolution", content: spatialResolution },
        { title: "Instrument ID", content: id },
      ]}
    />
  )
}

About.propTypes = {
  id: PropTypes.string.isRequired,
  radiometricFrequency: PropTypes.string.isRequired,
  temporalResolution: PropTypes.string.isRequired,
  spatialResolution: PropTypes.string.isRequired,
}

export function Background({ instrumentManufacturer, fundingSource }) {
  return (
    <div style={{ marginTop: `2rem` }}>
      <div style={{ padding: `1rem 0` }}>
        <Label id={"instrument-manufacturer"} showBorder>
          Maker of Instrument
        </Label>
        {instrumentManufacturer}
      </div>
      <div style={{ padding: `1rem 0` }}>
        <Label id={"funding-source"} showBorder>
          Funding Program Lead
        </Label>
        {fundingSource}
      </div>
    </div>
  )
}

Background.propTypes = {
  id: PropTypes.string.isRequired,
  radiometricFrequency: PropTypes.string.isRequired,
  temporalResolution: PropTypes.string.isRequired,
  spatialResolution: PropTypes.string.isRequired,
  instrumentManufacturer: PropTypes.string.isRequired,
  fundingSource: PropTypes.string.isRequired,
}

export const instrumentDetailFields = graphql`
  fragment instrumentDetailFields on instrument {
    id
    radiometricFrequency: radiometric_frequency
    temporalResolution: temporal_resolution
    spatialResolution: spatial_resolution
    instrumentManufacturer: instrument_manufacturer
    fundingSource: funding_source
  }
`
