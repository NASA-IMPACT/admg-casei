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

function Background({
  instrumentDoi,
  instrumentManufacturer,
  fundingSource,
  leadInvestigator,
  technicalContact,
  facility,
}) {
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
          Funding Source
        </Label>
        {fundingSource || "N/A"}
      </div>
      <div style={{ padding: `1rem 0` }}>
        <Label id={"lead-investigator"} showBorder>
          Lead Investigator
        </Label>
        {leadInvestigator || "N/A"}
      </div>
      <div style={{ padding: `1rem 0` }}>
        <Label id={"technical-contact"} showBorder>
          Technical Contact
        </Label>
        {technicalContact || "N/A"}
      </div>
      <div style={{ padding: `1rem 0` }}>
        <Label id={"facility"} showBorder>
          Facility
        </Label>
        {facility || "N/A"}
      </div>
    </div>
  )
}

Background.propTypes = {
  instrumentDoi: PropTypes.string,
  instrumentManufacturer: PropTypes.string,
  fundingSource: PropTypes.string,
  leadInvestigator: PropTypes.string,
  technicalContact: PropTypes.string,
  facility: PropTypes.string,
}

export default function About({
  id,
  instrumentTypes,
  radiometricFrequency,
  temporalResolution,
  spatialResolution,
  calibration,
  measurementRegions,
  gcmdPhenomenas,
  instrumentId,
  instrumentDoi,
  instrumentManufacturer,
  fundingSource,
  leadInvestigator,
  technicalContact,
  facility,
}) {
  return (
    <SectionBlock id={id}>
      <SectionHeader headline="About the Instrument" id={id} />
      <SectionContent columns={[1, 8]}>
        <DefinitionList
          id="instrument"
          list={[
            {
              title: "Type",
              content:
                instrumentTypes.map(x => x.longname).join(", ") ||
                "unavailable",
            },
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
            {
              title: "Calibration Information",
              content: calibration ? (
                <ExternalLink
                  label={calibration}
                  url={calibration}
                  id="calibration-doi"
                />
              ) : (
                "unavailable"
              ),
            },
            {
              title: "Measurement Regions",
              content:
                measurementRegions.map(x => x.longname).join(", ") ||
                "unavailable",
            },
            {
              title: "GCMD Phenomenas",
              content:
                gcmdPhenomenas
                  .map(x =>
                    Object.values(x)
                      .filter(x => x)
                      .join(", ")
                  )
                  .join(", ") || "unavailable",
            },
            {
              title: "Instrument UUID",
              content: instrumentId || "unavailable",
            },
          ]}
        />
      </SectionContent>
      <SectionContent columns={[10, 3]}>
        <Background
          instrumentDoi={instrumentDoi}
          instrumentManufacturer={instrumentManufacturer}
          fundingSource={fundingSource}
          leadInvestigator={leadInvestigator}
          technicalContact={technicalContact}
          facility={facility}
        />
      </SectionContent>
    </SectionBlock>
  )
}

About.propTypes = {
  id: PropTypes.string,
  collectionPeriods: PropTypes.arrayOf(PropTypes.string),
  instrumentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  radiometricFrequency: PropTypes.string,
  temporalResolution: PropTypes.string,
  spatialResolution: PropTypes.string,
  calibration: PropTypes.string,
  measurementRegions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  gcmdPhenomenas: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.string,
      topic: PropTypes.string,
      variable_1: PropTypes.string,
      variable_2: PropTypes.string,
      variable_3: PropTypes.string,
    }).isRequired
  ).isRequired,
  instrumentId: PropTypes.string,
  instrumentDoi: PropTypes.string,
  instrumentManufacturer: PropTypes.string,
  fundingSource: PropTypes.string,
  leadInvestigator: PropTypes.string,
  technicalContact: PropTypes.string,
  facility: PropTypes.string,
}

export const instrumentDetailFields = graphql`
  fragment instrumentDetailFields on instrument {
    id
    collectionPeriods: collection_periods
    instrumentTypes: instrument_types {
      id
      longname: long_name
    }
    radiometricFrequency: radiometric_frequency
    temporalResolution: temporal_resolution
    spatialResolution: spatial_resolution
    calibration: calibration_information
    measurementRegions: measurement_regions {
      id
      longname: long_name
    }
    gcmdPhenomenas: gcmd_phenomenas {
      term
      topic
      variable_1
      variable_2
      variable_3
    }

    instrumentDoi: instrument_doi
    instrumentManufacturer: instrument_manufacturer
    fundingSource: funding_source
    leadInvestigator: lead_investigator
    technicalContact: technical_contact
    facility
  }
`
