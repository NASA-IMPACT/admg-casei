import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import ExternalLink from "../../components/external-link"
import Label from "../../components/label"
import { NEGATIVE } from "../../utils/constants"
import {
  selector,
  uniqueElementsById,
  doiFilter,
} from "../../utils/filter-utils"
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
    ? dois.filter(doiFilter(selectedFilterIds))
    : dois

  const campaignList = uniqueElementsById(dois.map(doi => doi.campaigns).flat())
  const platformList = uniqueElementsById(dois.map(doi => doi.platforms).flat())

  const { getFilterLabelById } = selector({
    campaign: { options: campaignList },
    platform: { options: platformList },
  })

  return (
    <Section id={id}>
      <SectionHeader headline="Data Products" id={id} />
      <SectionContent>
        {dois.length ? (
          <>
            {campaignList.concat(platformList).length > 0 && (
              <>
                <p>
                  Filter data products from this instrument by specific
                  campaigns or platforms.
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
                  {!!platformList.length && (
                    <FilterBox
                      filterOptions={platformList}
                      filterName="Platforms"
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
                    {doi.doi && (
                      <ExternalLink
                        label={doi.doi}
                        url={`http://dx.doi.org/${doi.doi}`}
                        id="doi"
                      ></ExternalLink>
                    )}
                  </div>

                  {doi.campaigns.concat(doi.platforms).length ? (
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
                              <small>
                                {campaign.longname || campaign.shortname}
                              </small>
                            </Link>
                          ))}
                        </div>
                      )}
                      {!!doi.platforms && (
                        <div data-cy="data-product-platforms">
                          <Label id="doi-platform" showBorder>
                            Platforms
                          </Label>
                          {doi.platforms.map(platform => (
                            <Link
                              key={platform.id}
                              to={`/platform/${platform.id}`}
                            >
                              <small>
                                {platform.longname || platform.shortname}
                              </small>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <small data-cy="no-campaigns-label">
                      No Related Campaigns or Platforms
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

export const instrumentDataFields = graphql`
  fragment instrumentDataFields on instrument {
    dois {
      cmrTitle: cmr_entry_title
      doi
      id
      longname: long_name
      campaigns {
        id
        shortname: short_name
        longname: long_name
      }
      platforms {
        id
        shortname: short_name
        longname: long_name
      }
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
      campaigns: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ),
      platforms: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          shortname: PropTypes.string.isRequired,
          longname: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
}

export default DataSection
