import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import DefinitionTable from "../../components/tables/definitionTable"
import Label from "../../components/label"
import { SectionBlock } from "../../components/section"

export function About({
  id,
  radiometricFrequency,
  temporalResolution,
  spatialResolution,
}) {
  return (
    <SectionBlock headline="About the Instrument" id="instrument-details">
      <DefinitionTable
        tableData={[
          {
            title: "Radiometric Frequency of Measurement",
            content: radiometricFrequency || "unavailable",
          },
          {
            title: "Temporal Resolution",
            content: temporalResolution || "unavailable",
          },
          {
            title: "Spatial Resolution",
            content: spatialResolution || "unavailable",
          },
          { title: "Instrument ID", content: id || "unavailable" },
        ]}
      />
    </SectionBlock>
  )
}

About.propTypes = {
  id: PropTypes.string,
  radiometricFrequency: PropTypes.string,
  temporalResolution: PropTypes.string,
  spatialResolution: PropTypes.string,
}

export function Background({ instrumentManufacturer, fundingSource }) {
  return (
    <div style={{ marginTop: `2rem` }}>
      <div style={{ padding: `1rem 0` }}>
        <Label id={"instrument-manufacturer"} showBorder>
          Maker of Instrument
        </Label>
        {instrumentManufacturer || "N/A"}
      </div>
      <div style={{ padding: `1rem 0` }}>
        <Label id={"funding-source"} showBorder>
          Funding Program Lead
        </Label>
        {fundingSource || "N/A"}
      </div>
    </div>
  )
}

Background.propTypes = {
  id: PropTypes.string,
  radiometricFrequency: PropTypes.string,
  temporalResolution: PropTypes.string,
  spatialResolution: PropTypes.string,
  instrumentManufacturer: PropTypes.string,
  fundingSource: PropTypes.string,
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
