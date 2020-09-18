import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import DefinitionList from "../../components/tables/definitionList"
import Label from "../../components/label"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"
import ExternalLink from "../../components/external-link"

function Background({ instrumentDoi, instrumentManufacturer, fundingSource }) {
  return (
    <div data-cy="instrument-background">
      <div style={{ padding: `1rem 0` }}>
        {instrumentDoi ? (
          <p
            style={{
              whiteSpace: `nowrap`,
              overflow: `hidden`,
              textOverflow: `ellipsis`,
            }}
          >
            DOI:{" "}
            <ExternalLink
              label={instrumentDoi}
              url={instrumentDoi}
              id="instrument-doi"
            />
          </p>
        ) : (
          <p data-cy="doi-link">no instrument DOI available</p>
        )}
      </div>
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
  instrumentDoi: PropTypes.string,
  instrumentManufacturer: PropTypes.string,
  fundingSource: PropTypes.string,
}

export default function About({
  id,
  radiometricFrequency,
  temporalResolution,
  spatialResolution,
  instrumentId,
  instrumentDoi,
  instrumentManufacturer,
  fundingSource,
}) {
  return (
    <SectionBlock id={id}>
      <SectionHeader headline="About the Instrument" id={id} />
      <SectionContent columns={[1, 8]}>
        <DefinitionList
          id="instrument"
          list={[
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
            { title: "Instrument ID", content: instrumentId || "unavailable" },
          ]}
        />
      </SectionContent>
      <SectionContent columns={[10, 3]}>
        <Background
          instrumentDoi={instrumentDoi}
          instrumentManufacturer={instrumentManufacturer}
          fundingSource={fundingSource}
        />
      </SectionContent>
    </SectionBlock>
  )
}

About.propTypes = {
  id: PropTypes.string,
  radiometricFrequency: PropTypes.string,
  temporalResolution: PropTypes.string,
  spatialResolution: PropTypes.string,
  instrumentId: PropTypes.string,
  instrumentDoi: PropTypes.string,
  instrumentManufacturer: PropTypes.string,
  fundingSource: PropTypes.string,
}

export const instrumentDetailFields = graphql`
  fragment instrumentDetailFields on instrument {
    id
    radiometricFrequency: radiometric_frequency
    temporalResolution: temporal_resolution
    spatialResolution: spatial_resolution
    instrumentDoi: instrument_doi
    instrumentManufacturer: instrument_manufacturer
    fundingSource: funding_source
  }
`
