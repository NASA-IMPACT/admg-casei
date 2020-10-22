import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import DefinitionList from "../../components/layout/definition-list"
import Label from "../../components/label"
import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/layout"
import ExternalLink from "../../components/external-link"
import { isUrl } from "../../utils/helpers"

function BackgroundListItem({ id, label, children }) {
  return (
    <div style={{ padding: `1rem 0` }}>
      <Label id={id} showBorder>
        {label}
      </Label>
      {children}
    </div>
  )
}

BackgroundListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
BackgroundListItem.defaultProps = {
  children: "N/A",
}

function Background({
  instrumentDoi,
  instrumentManufacturer,
  fundingSource,
  leadInvestigator,
  technicalContact,
  overviewPublication,
  repositories,
}) {
  return (
    <div data-cy="instrument-background">
      <BackgroundListItem id="lead-investigator" label="Lead Investigator">
        {leadInvestigator}
      </BackgroundListItem>
      <BackgroundListItem id="technical-contact" label="Technical Contact">
        {technicalContact}
      </BackgroundListItem>
      <BackgroundListItem id="instrument-manufacturer" label="Instrument Maker">
        {instrumentManufacturer}
      </BackgroundListItem>
      <BackgroundListItem id="funding-source" label="Funding Source">
        {fundingSource}
      </BackgroundListItem>
      {instrumentDoi && (
        <div style={{ padding: `1rem 0` }}>
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
        </div>
      )}
      <BackgroundListItem id="data-locations" label="Data Locations">
        {isUrl(overviewPublication) ? (
          <ExternalLink
            label="Overview Publication"
            url={overviewPublication}
            id="overview-publication"
          />
        ) : (
          "N/A"
        )}
      </BackgroundListItem>
      <BackgroundListItem
        id="repositories"
        label={repositories.length === 1 ? "Repository" : "Repositories"}
      >
        {repositories.length > 0 ? (
          <ul style={{ margin: `0` }}>
            {repositories.map(repository => (
              <li
                style={{ listStyle: `none`, paddingBottom: `4px` }}
                key={repository.id}
                data-cy="repository"
              >
                <p>{repository.longname}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No repository available</p>
        )}
      </BackgroundListItem>
    </div>
  )
}

Background.propTypes = {
  instrumentDoi: PropTypes.string,
  instrumentManufacturer: PropTypes.string,
  fundingSource: PropTypes.string,
  leadInvestigator: PropTypes.string,
  technicalContact: PropTypes.string,
  overviewPublication: PropTypes.string,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      longname: PropTypes.string,
    })
  ),
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
  instrumentDoi,
  instrumentManufacturer,
  fundingSource,
  leadInvestigator,
  technicalContact,
  onlineInformation,
  overviewPublication,
  repositories,
}) {
  const links = onlineInformation ? onlineInformation.split("\n") : null

  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Instrument Details" id={id} />
      <SectionContent columns={[1, 8]}>
        <DefinitionList
          id="instrument"
          list={[
            {
              title: "Instrument Type",
              content: instrumentTypes.map(x => x.longname).join(", ") || "N/A",
            },
            {
              title: "Measurement/Variables",
              content:
                gcmdPhenomenas
                  .map(x =>
                    Object.values(x)
                      .filter(x => x)
                      .join(", ")
                  )
                  .join(", ") || "N/A",
            },
            {
              title: "Measurement Regions",
              content:
                measurementRegions.map(x => x.longname).join(", ") || "N/A",
            },
            {
              title: "Temporal Resolution",
              content: temporalResolution || "N/A",
            },
            {
              title: "Spatial Resolution",
              content: spatialResolution || "N/A",
            },
            {
              title: "Measurement Frequency",
              content: radiometricFrequency || "N/A",
            },
            {
              title: "Calibration Details",
              content: calibration ? (
                <ExternalLink
                  label={calibration}
                  url={calibration}
                  id="calibration-doi"
                />
              ) : (
                "N/A"
              ),
            },
            {
              title: "Online Information",
              content: onlineInformation ? (
                <ul style={{ margin: `0` }}>
                  {links
                    .map(link => link.replace(",", ""))
                    .map(link => (
                      <li key={link} style={{ listStyle: `none` }}>
                        {isUrl(link) ? (
                          <ExternalLink
                            label={link}
                            url={link}
                            id="online-information"
                          />
                        ) : (
                          <p className="placeholder">{link}</p> // fallback for invalid url
                        )}
                      </li>
                    ))}
                </ul>
              ) : (
                "N/A"
              ),
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
          onlineInformation={onlineInformation}
          overviewPublication={overviewPublication}
          repositories={repositories}
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
  instrumentDoi: PropTypes.string,
  instrumentManufacturer: PropTypes.string,
  fundingSource: PropTypes.string,
  leadInvestigator: PropTypes.string,
  technicalContact: PropTypes.string,
  onlineInformation: PropTypes.string,
  overviewPublication: PropTypes.string,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
    })
  ),
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
    onlineInformation: online_information
    overviewPublication: overview_publication
    repositories {
      id
      longname: long_name
    }
  }
`
