import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import { Section, SectionHeader, SectionContent } from "../../components/layout"
import ExternalLink from "../../components/external-link"
import Label from "../../components/label"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../utils/theme"
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
            .map(campaign => campaign.longname)
            .some(id => selectedFilterIds.includes(id)) ||
          doi.platforms
            .map(platform => platform.longname)
            .some(id => selectedFilterIds.includes(id))
      )
    : dois

  const campaignList = [...new Set(dois.map(doi => doi.campaigns).flat())]
  const platformList = [...new Set(dois.map(doi => doi.platforms).flat())]

  return (
    <Section id={id}>
      <SectionHeader headline="Data Products" id={id} />
      <SectionContent>
        {dois.length < 1 ? (
          "No data products available."
        ) : (
          <>
            {campaignList.concat(platformList).length > 2 && (
              <div
                style={{
                  display: `flex`,
                  borderBottom: `1px solid ${colors[NEGATIVE].altText}`,
                  padding: `2rem 0`,
                  marginBottom: `2rem`,
                }}
              >
                <FilterBox
                  filterOptions={campaignList}
                  filterName="Campaigns"
                  setSelectedFilterIds={setSelectedFilterIds}
                  selectedFilterIds={selectedFilterIds}
                />
                <FilterBox
                  filterOptions={platformList}
                  filterName="Platforms"
                  setSelectedFilterIds={setSelectedFilterIds}
                  selectedFilterIds={selectedFilterIds}
                />
              </div>
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
              style={{
                display: `grid`,
                gridTemplateColumns: `repeat(auto-fit, minmax(18rem, 1fr))`,
                gap: `1rem`,
              }}
            >
              {filteredDois.map(doi => (
                <div
                  key={doi.id}
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    backgroundColor: colors[NEGATIVE].background,
                    gap: `0.5rem`,
                    padding: `1.5rem`,
                  }}
                  data-cy="data-product"
                >
                  <label data-cy="doi-label">{doi.longname}</label>
                  <ExternalLink
                    label={doi.shortname}
                    url={`http://dx.doi.org/${doi.shortname}`}
                    id="doi"
                  ></ExternalLink>

                  {doi.campaigns.concat(doi.platforms).length ? (
                    <div
                      style={{
                        flex: `2.618`,
                        display: `grid`,
                        gap: `1rem`,
                        gridTemplateColumns: `1fr 1fr`,
                      }}
                    >
                      <div data-cy="data-product-campaigns">
                        <Label id="doi-campaign" showBorder>
                          Campaigns
                        </Label>
                        {doi.campaigns.map(campaign => (
                          <Link
                            key={campaign.id}
                            to={`/campaign/${campaign.id}`}
                          >
                            <small>{campaign.longname}</small>
                          </Link>
                        ))}
                      </div>
                      <div data-cy="data-product-platforms">
                        <Label id="doi-platform" showBorder>
                          Platforms
                        </Label>
                        {doi.platforms.map(platform => (
                          <Link
                            key={platform.id}
                            to={`/platform/${platform.id}`}
                          >
                            <small>{platform.longname}</small>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <label data-cy="no-campaigns-label">
                      No Related Campaigns or Platforms
                    </label>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </SectionContent>
    </Section>
  )
}

export const instrumentDataFields = graphql`
  fragment instrumentDataFields on instrument {
    dois {
      id
      shortname: short_name
      longname: long_name
    }
  }
`
DataSection.propTypes = {
  id: PropTypes.string.isRequired,
  dois: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      shortname: PropTypes.string.isRequired,
      longname: PropTypes.string,
    })
  ).isRequired,
}

export default DataSection
