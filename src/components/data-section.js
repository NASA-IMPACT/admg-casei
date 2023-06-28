import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { Section, SectionHeader, SectionContent } from "./layout"
import ExternalLink from "./external-link"
import Label from "./label"
import { NEGATIVE } from "../utils/constants"
import { selector, uniqueElementsById, doiFilter } from "../utils/filter-utils"
import { colors } from "../theme"
import FilterChips from "./filter/filter-chips"
import FilterBox from "./filter/filter-box"
import Chip from "./chip"

const DataSection = ({ id, dois, filterBy, category }) => {
  const [filter1, filter2, filter3] = filterBy
  let [selectedFilterIds, setSelectedFilterIds] = useState([])

  // manually parse the data formats string to derive array of objects
  const parsedDois = dois.map(doi => ({
    ...doi,
    formats:
      doi.formats && !doi.formats.includes("null") && doi.formats.split("[")[1]
        ? doi.formats
            ?.split("[")[1]
            .split("]")[0]
            .split(",")
            .map(s =>
              s.replace(/[^a-zA-Z ]/g, "").replace(/^\s+|\s+$|\s+(?=\s)/g, "")
            )
            .filter(f => f !== "")
            .map(format => ({
              id: format,
              shortname: format,
              longname: format,
            }))
        : [],
  }))

  const clearFilters = () => setSelectedFilterIds([])

  const removeFilter = id =>
    setSelectedFilterIds(selectedFilterIds.filter(f => f !== id))

  const filteredDois = selectedFilterIds.length
    ? parsedDois.filter(doiFilter(selectedFilterIds))
    : parsedDois

  const campaignList = uniqueElementsById(dois.map(doi => doi.campaigns).flat())
  const platformList = uniqueElementsById(dois.map(doi => doi.platforms).flat())
  const instrumentList = uniqueElementsById(
    dois.map(doi => doi.instruments).flat()
  )
  const formatList = parsedDois.reduce(
    (acc, doi) => {
      if (doi.formats.length > 0) {
        for (const format of doi.formats) {
          if (!acc.unique.has(format.id)) {
            acc.unique.add(format.id)
            acc.values.push(format)
          }
        }
      }
      return acc
    },
    { unique: new Set(), values: [] }
  ).values

  const { getFilterLabelById } = selector({
    campaign: { options: campaignList },
    instrument: { options: instrumentList },
    platform: { options: platformList },
    format: { options: formatList },
  })

  return (
    <Section id={id}>
      <SectionHeader headline="Data Products" id={id} />
      <SectionContent>
        {dois.length ? (
          <>
            {campaignList.length +
              platformList.length +
              instrumentList.length +
              formatList.length >
              0 && (
              <>
                <p>
                  Filter data products from this {category} by specific{" "}
                  {filter1}, {filter2}, or {filter3}.
                </p>
                <div
                  css={`
                    display: flex;
                    border-bottom: 1px solid ${colors[NEGATIVE].altText};
                    padding: 2rem 0;
                    margin-bottom: 2rem;
                  `}
                >
                  {filterBy.includes("campaigns") && !!campaignList.length && (
                    <FilterBox
                      filterOptions={campaignList}
                      filterName="Campaigns"
                      setSelectedFilterIds={setSelectedFilterIds}
                      selectedFilterIds={selectedFilterIds}
                    />
                  )}
                  {filterBy.includes("platforms") && !!platformList.length && (
                    <FilterBox
                      filterOptions={platformList}
                      filterName="Platforms"
                      setSelectedFilterIds={setSelectedFilterIds}
                      selectedFilterIds={selectedFilterIds}
                    />
                  )}
                  {filterBy.includes("instruments") &&
                    !!instrumentList.length && (
                      <FilterBox
                        filterOptions={instrumentList}
                        filterName="Instruments"
                        setSelectedFilterIds={setSelectedFilterIds}
                        selectedFilterIds={selectedFilterIds}
                      />
                    )}
                  {filterBy.includes("formats") && !!formatList.length && (
                    <FilterBox
                      filterOptions={formatList}
                      filterName="Formats"
                      setSelectedFilterIds={setSelectedFilterIds}
                      selectedFilterIds={selectedFilterIds}
                    />
                  )}
                </div>
              </>
            )}
            {selectedFilterIds.length > 0 && (
              <FilterChips clearFilters={clearFilters}>
                {selectedFilterIds.map(f => (
                  <Chip
                    key={f}
                    id="filter"
                    label={getFilterLabelById ? getFilterLabelById(f) : f}
                    actionId={f}
                    removeAction={removeFilter}
                  />
                ))}
              </FilterChips>
            )}
            <div
              css={`
                display: flex;
                flex-direction: column;
                max-height: 35rem;
                overflow: auto;
                gap: 1rem;
              `}
            >
              {filteredDois.map(doi => {
                return (
                  <div
                    key={doi.id}
                    css={`
                      display: grid;
                      gap: 1rem;
                      grid-template-columns: 1fr 1fr;
                      background-color: ${colors[NEGATIVE].background};
                      padding: 1.5rem;
                    `}
                    data-cy="data-product"
                  >
                    <div>
                      <Label id="doi" color={colors[NEGATIVE].text}>
                        {doi.longname || doi.cmrTitle}
                      </Label>
                      {doi.doi && (
                        <ExternalLink
                          label={doi.doi}
                          url={`http://dx.doi.org/${doi.doi}`}
                          id="doi"
                        ></ExternalLink>
                      )}
                    </div>

                    {doi[filter1].length +
                    doi[filter2].length +
                    doi[filter3].length ? (
                      <div
                        css={`
                          display: flex;
                          flex-direction: column;
                          gap: 1rem;
                        `}
                      >
                        {filterBy.includes("campaigns") &&
                          !!doi.campaigns.length && (
                            <div data-cy="data-product-campaigns">
                              <Label id="doi-campaign" showBorder>
                                Campaigns
                              </Label>
                              {doi.campaigns.map((campaign, index) => (
                                <React.Fragment key={campaign.id}>
                                  <Link to={`/campaign/${campaign.shortname}`}>
                                    <small>
                                      {campaign.longname || campaign.shortname}
                                    </small>
                                  </Link>
                                  {index !== doi.campaigns.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        {filterBy.includes("platforms") &&
                          !!doi.platforms.length && (
                            <div data-cy="data-product-platforms">
                              <Label id="doi-platform" showBorder>
                                Platforms
                              </Label>
                              {doi.platforms.map((platform, index) => (
                                <React.Fragment key={platform.id}>
                                  <Link to={`/platform/${platform.shortname}`}>
                                    <small>
                                      {platform.longname || platform.shortname}
                                    </small>
                                  </Link>
                                  {index !== doi.platforms.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                            </div>
                          )}

                        {filterBy.includes("instruments") &&
                          !!doi.instruments.length && (
                            <div data-cy="data-product-instruments">
                              <Label id="doi-instrument" showBorder>
                                Instruments
                              </Label>
                              {doi.instruments.map((instrument, index) => (
                                <React.Fragment key={instrument.id}>
                                  <Link
                                    to={`/instrument/${instrument.shortname}`}
                                  >
                                    <small>
                                      {instrument.longname ||
                                        instrument.shortname}
                                    </small>
                                  </Link>
                                  {index !== doi.instruments.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                        {filterBy.includes("formats") &&
                          doi.formats &&
                          doi.formats.length > 0 && (
                            <div data-cy="data-product-formats">
                              <Label id="doi-format" showBorder>
                                Formats
                              </Label>
                              {doi.formats?.map((format, index) => (
                                <React.Fragment key={format.id}>
                                  <Link to={`/platform/${format.shortname}`}>
                                    <small>{format.shortname}</small>
                                  </Link>
                                  {index !== doi.formats.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                            </div>
                          )}
                      </div>
                    ) : (
                      <small data-cy="no-related-label">
                        No related {filter1}, {filter2} or {filter3}
                      </small>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <label data-cy="no-doi-label">
            There are no data products linked to this campaign in CASEI - yet.
          </label>
        )}
      </SectionContent>
    </Section>
  )
}

DataSection.propTypes = {
  id: PropTypes.string.isRequired,
  dois: PropTypes.arrayOf(
    PropTypes.shape({
      cmrTitle: PropTypes.string.isRequired,
      doi: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      longname: PropTypes.string,
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ),
      data_formats: PropTypes.arrayOf(PropTypes.string),
      instruments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  filterBy: PropTypes.arrayOf(
    PropTypes.oneOf(["campaigns", "platforms", "instruments", "formats"])
  ),
  category: PropTypes.oneOf(["campaign", "platform", "instrument", "format"]),
}

export default DataSection
