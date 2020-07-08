import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Table from "../../components/table"

export default function Detail({
  id,
  radiometricFrequency,
  temporalResolution,
  spatialResolution,
}) {
  console.log("checking", radiometricFrequency, id)
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
export const instrumentDetailFields = graphql`
  fragment instrumentDetailFields on instrument {
    id
    radiometricFrequency: radiometric_frequency
    temporalResolution: temporal_resolution
    spatialResolution: spatial_resolution
  }
`

Detail.propTypes = {
  id: PropTypes.string.isRequired,
  radiometricFrequency: PropTypes.string.isRequired,
  temporalResolution: PropTypes.string.isRequired,
  spatialResolution: PropTypes.string.isRequired,
}
