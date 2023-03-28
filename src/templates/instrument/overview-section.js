import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import VisuallyHidden from "@reach/visually-hidden"

import DefinitionList from "../../components/layout/definition-list"
import {
  Section,
  SectionHeader,
  SectionContent,
  ListLink,
} from "../../components/layout"
import GcmdPhenomenon from "../../components/gcmd_phenomenon"
import ExternalLink from "../../components/external-link"
import { POSITIVE } from "../../utils/constants"
import { isUrl } from "../../utils/helpers"
import { colors } from "../../theme"

function BackgroundListItem({ id, label, children }) {
  return (
    <li
      css={`
        padding: 1rem 0;
      `}
      data-cy={`${id}-label`}
    >
      <label
        css={`
          color: ${colors[POSITIVE].altText};
        `}
      >
        {label}
      </label>
      <p>{children}</p>
    </li>
  )
}

BackgroundListItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}
BackgroundListItem.defaultProps = {
  children: "Currently unavailable",
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
    <ul
      css={`
        margin: 0;
        list-style: none;
      `}
      data-cy="instrument-background"
    >
      <BackgroundListItem id="lead-investigator" label="Lead Investigator">
        {leadInvestigator || "Currently unavailable"}
      </BackgroundListItem>
      <BackgroundListItem id="technical-contact" label="Technical Contact">
        {technicalContact || "Currently unavailable"}
      </BackgroundListItem>
      <BackgroundListItem id="instrument-manufacturer" label="Instrument Maker">
        {instrumentManufacturer || "Currently unavailable"}
      </BackgroundListItem>
      <BackgroundListItem id="funding-source" label="Funding Source">
        {fundingSource || "Currently unavailable"}
      </BackgroundListItem>
      {instrumentDoi && (
        <div
          css={`
            padding: 1rem 0;
          `}
        >
          <p
            css={`
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
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
      <BackgroundListItem id="data-locations" label="Overview Publications">
        {overviewPublication && isUrl(overviewPublication) ? (
          <ExternalLink
            label="Overview Publication"
            url={overviewPublication}
            id="overview-publication"
            mode={POSITIVE}
          />
        ) : (
          "Currently unavailable"
        )}
      </BackgroundListItem>
      <li
        css={`
          padding: 1rem 0;
        `}
        data-cy="repositories-label"
      >
        <label
          css={`
            color: ${colors[POSITIVE].altText};
          `}
        >
          {repositories.length === 1 ? "Repository" : "Repositories"}
        </label>
        {repositories.length > 0 ? (
          <ul
            css={`
              margin: 0;
              list-style: none;
            `}
            data-cy="repository-list"
          >
            {repositories.map(repo => (
              <ListLink key={repo.id} to={repo.url} mode={POSITIVE} noPadding>
                {repo.longname}
              </ListLink>
            ))}
          </ul>
        ) : (
          <p>Currently unavailable</p>
        )}
      </li>
    </ul>
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

export default function OverviewSection({
  id,
  measurementType,
  radiometricFrequency,
  temporalResolution,
  spatialResolution,
  calibration,
  measurementRegions,
  gcmdPhenomena,
  instrumentDoi,
  instrumentManufacturer,
  fundingSource,
  leadInvestigator,
  technicalContact,
  onlineInformation,
  overviewPublication,
  repositories,
}) {
  return (
    <Section id={id} mode={POSITIVE}>
      <VisuallyHidden>
        <SectionHeader headline="Overview" id={id} />
      </VisuallyHidden>
      <SectionContent mode={POSITIVE} columns={[1, 8]}>
        <h3>Instrument Details</h3>
        <DefinitionList
          id="instrument"
          mode={POSITIVE}
          list={[
            {
              title: "Measurement Type",
              content:
                measurementType && measurementType.longname
                  ? measurementType.longname
                  : "Currently unavailble",
            },
            {
              title: "Measurement/Variables",
              content: gcmdPhenomena.map(x => (
                <GcmdPhenomenon key={x.id} gcmdPhenomenon={x} />
              )),
            },
            {
              title: "Vertical Measurement Regions",
              content:
                measurementRegions.map(x => x.longname).join(", ") ||
                "Currently unavailble",
            },
            {
              title: "Temporal Resolution",
              content: temporalResolution || "Currently unavailble",
            },
            {
              title: "Spatial Resolution",
              content: spatialResolution || "Currently unavailble",
            },
            {
              title: "Measurement Frequency",
              content: radiometricFrequency || "Currently unavailble",
            },
            {
              title: "Calibration Details",
              content: calibration ? (
                <ExternalLink
                  label={calibration}
                  url={calibration}
                  id="calibration-doi"
                  mode={POSITIVE}
                />
              ) : (
                "Currently unavailble"
              ),
            },
            {
              title: "Online Information",
              content:
                onlineInformation && onlineInformation.length ? (
                  <ul
                    css={`
                      margin: 0;
                    `}
                  >
                    {onlineInformation.map(link => (
                      <li
                        key={link}
                        css={`
                          list-style: none;
                        `}
                      >
                        {isUrl(link) ? (
                          <ExternalLink
                            label={link}
                            url={link}
                            id="online-information"
                            mode={POSITIVE}
                          />
                        ) : (
                          <p className="placeholder">{link}</p> // fallback for invalid url
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "Currently unavailble"
                ),
            },
          ]}
        />
      </SectionContent>
      <SectionContent mode={POSITIVE} columns={[10, 3]}>
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
    </Section>
  )
}

OverviewSection.propTypes = {
  id: PropTypes.string,
  collectionPeriods: PropTypes.arrayOf(PropTypes.string),
  measurementType: PropTypes.shape({
    id: PropTypes.string.isRequired,
    longname: PropTypes.string.isRequired,
  }).isRequired,
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
  gcmdPhenomena: PropTypes.arrayOf(
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
  onlineInformation: PropTypes.arrayOf(PropTypes.string),
  overviewPublication: PropTypes.string,
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      longname: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
}

export const instrumentDetailFields = graphql`
  fragment instrumentDetailFields on instrument {
    id
    collectionPeriods: collection_periods {
      id
    }
    measurementType: measurement_type {
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
    gcmdPhenomena: gcmd_phenomena {
      id
      category
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
      url: notes_public
    }
  }
`
