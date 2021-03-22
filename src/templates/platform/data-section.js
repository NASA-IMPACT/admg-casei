import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import ExternalLink from "../../components/external-link"
import Label from "../../components/label"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"
import FilterChips from "../../components/filter/filter-chips"
import FilterBox from "../../components/filter/filter-box"
import Chip from "../../components/chip"

const DataSection = ({ id, dois }) => {
  let [selectedFilterIds, setSelectedFilterIds] = useState([])

  const clearFilters = () => setSelectedFilterIds([])
  const removeFilter = id =>
    setSelectedFilterIds(selectedFilterIds.filter(f => f !== id))

  const filteredDois = selectedFilterIds.length
    ? dois.filter(
        doi =>
          doi.campaigns
            .map(campaign => campaign.longname || campaign.shortname)
            .some(id => selectedFilterIds.includes(id)) ||
          doi.instruments
            .map(instrument => instrument.longname || instrument.shortname)
            .some(id => selectedFilterIds.includes(id))
      )
    : dois

  const campaignList = [...new Set(dois.map(doi => doi.campaigns).flat())]
  const instrumentList = [...new Set(dois.map(doi => doi.instruments).flat())]

  return (
    <Section id={id}>
      <SectionHeader headline="Data Products" id={id} />
      <SectionContent>
        {dois.length ? (
          <>
            {campaignList.concat(instrumentList).length > 0 && (
              <>
                <p>
                  Filter data products from this platform by specific campaigns
                  or instruments.
                </p>
                <div
                  css={`
                    display: flex;
                    border-bottom: 1px solid ${colors[NEGATIVE].altText};
                    padding: 2rem 0;
                    margin-bottom: 2rem;
                  `}
                >
                  {!!campaignList.length && (
                    <FilterBox
                      filterOptions={campaignList}
                      filterName="Campaigns"
                      setSelectedFilterIds={setSelectedFilterIds}
                      selectedFilterIds={selectedFilterIds}
                    />
                  )}
                  {!!instrumentList.length && (
                    <FilterBox
                      filterOptions={instrumentList}
                      filterName="Instruments"
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
                    label={f}
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
              {filteredDois.map(doi => (
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
                    <ExternalLink
                      label={doi.doi}
                      url={`http://dx.doi.org/${doi.doi}`}
                      id="doi"
                    ></ExternalLink>
                  </div>

                  {doi.campaigns.concat(doi.instruments).length ? (
                    <div
                      css={`
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                      `}
                    >
                      {!!doi.campaigns.length && (
                        <div data-cy="data-product-campaigns">
                          <Label id="doi-campaign" showBorder>
                            Campaigns
                          </Label>
                          {doi.campaigns.map(campaign => (
                            <Link
                              key={campaign.id}
                              to={`/campaign/${campaign.id}`}
                            >
                              <small style={{ display: `inline-block` }}>
                                {campaign.longname || campaign.shortname}
                              </small>
                            </Link>
                          ))}
                        </div>
                      )}
                      {!!doi.instruments.length && (
                        <div data-cy="data-product-instruments">
                          <Label id="doi-instrument" showBorder>
                            Instruments
                          </Label>
                          {doi.instruments.map(instrument => (
                            <Link
                              key={instrument.id}
                              to={`/instrument/${instrument.id}`}
                            >
                              <small style={{ display: `inline-block` }}>
                                {instrument.longname || instrument.shortname}
                              </small>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <small data-cy="no-campaigns-label">
                      No Related Campaigns or Instruments
                    </small>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <label data-cy="no-doi-label">No data products available.</label>
        )}
      </SectionContent>
    </Section>
  )
}

export const platformDataFields = graphql`
  fragment platformDataFields on platform {
    dois {
      cmrTitle: cmr_entry_title
      doi
      id
      longname: long_name
    }
  }
`
DataSection.propTypes = {
  id: PropTypes.string.isRequired,
  dois: PropTypes.arrayOf(
    PropTypes.shape({
      cmrTitle: PropTypes.string.isRequired,
      doi: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
}

export default DataSection
