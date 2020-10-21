import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import VisuallyHidden from "@reach/visually-hidden"

import {
  SectionBlock,
  SectionHeader,
  SectionContent,
} from "../../components/section"
import ExternalLink from "../../components/external-link"
import Label from "../../components/label"
import theme from "../../utils/theme"
import { CloseIcon } from "../../components/icons"
import { IconButton } from "../../components/button"
import FilterChips from "../../components/filter-chips"

const Box = ({ children }) => (
  <div
    style={{
      backgroundColor: theme.color.secondary,
      boxShadow: `rgba(68, 63, 63, 0.08) 0px -1px 1px 0px, rgba(68, 63, 63, 0.08) 0px 2px 6px 0px`,
      padding: `1rem`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `space-between`,
      height: `100%`,
      marginBottom: `4px`,
    }}
  >
    {children}
  </div>
)
Box.propTypes = {
  children: PropTypes.node.isRequired,
}

const Filter = ({
  filterOptions,
  filterName,
  setSelectedFilterIds,
  selectedFilterIds,
}) => {
  let [value, setValue] = useState("")

  const handleSelection = value => {
    selectedFilterIds.includes(value)
      ? setSelectedFilterIds(selectedFilterIds.filter(f => f !== value))
      : setSelectedFilterIds([...selectedFilterIds, value])
    setValue("")
  }

  return (
    <div style={{ marginRight: `2rem` }}>
      <VisuallyHidden id={filterName}>{filterName}</VisuallyHidden>
      <ListboxInput
        aria-labelledby={filterName}
        defaultValue={value}
        onChange={value => handleSelection(value)}
        data-cy={`filter-by-${filterName}`}
      >
        <ListboxButton
          arrow="▼"
          style={{
            height: `2.5rem`,
            WebkitAppearance: `none`,
            background: `transparent`,
            border: `1px solid ${theme.color.base}`,
            borderRadius: `${theme.shape.rounded} `,
            color: theme.color.base,
            padding: `0.5rem`,
            cursor: `pointer`,
          }}
        >
          {filterName.toUpperCase()}
        </ListboxButton>
        <ListboxPopover style={{ background: theme.color.primary }}>
          <ListboxList data-cy="data-products-filter-options">
            {filterOptions.map(o => (
              <ListboxOption
                key={o.id}
                value={o.longname}
                data-cy="filter-option"
              >
                {o.longname.toUpperCase()}
                {selectedFilterIds.includes(o.longname) && (
                  <IconButton
                    id="remove-filter"
                    icon={<CloseIcon color={theme.color.base} />}
                  />
                )}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  )
}

Filter.propTypes = {
  filterOptions: PropTypes.array.isRequired,
  filterName: PropTypes.string.isRequired,
  setSelectedFilterIds: PropTypes.func.isRequired,
  selectedFilterIds: PropTypes.array.isRequired,
}

const DataSection = ({ id, dois }) => {
  let [selectedFilterIds, setSelectedFilterIds] = useState([])

  const clearFilters = () => setSelectedFilterIds([])

  const filteredDois = selectedFilterIds.length
    ? dois.filter(
        doi =>
          doi.campaigns
            .map(campaign => campaign.longname)
            .some(id => selectedFilterIds.includes(id)) ||
          doi.instruments
            .map(instrument => instrument.longname)
            .some(id => selectedFilterIds.includes(id))
      )
    : dois

  const campaignList = [...new Set(dois.map(doi => doi.campaigns).flat())]
  const instrumentList = [...new Set(dois.map(doi => doi.instruments).flat())]

  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Data Products" id={id} />
      <SectionContent>
        {dois.length < 1 ? (
          "No data products available."
        ) : (
          <>
            {campaignList.concat(instrumentList).length > 2 && (
              <div
                style={{
                  display: `flex`,
                  borderBottom: `1px solid ${theme.color.gray}`,
                  padding: `2rem 0`,
                  marginBottom: `2rem`,
                }}
              >
                <Filter
                  filterOptions={campaignList}
                  filterName="Campaigns"
                  setSelectedFilterIds={setSelectedFilterIds}
                  selectedFilterIds={selectedFilterIds}
                />
                <Filter
                  filterOptions={instrumentList}
                  filterName="Instruments"
                  setSelectedFilterIds={setSelectedFilterIds}
                  selectedFilterIds={selectedFilterIds}
                />
              </div>
            )}
            {selectedFilterIds.length > 0 && (
              <FilterChips
                selectedFilterIds={selectedFilterIds}
                setSelectedFilterIds={setSelectedFilterIds}
                clearFilters={clearFilters}
              />
            )}
            <div
              style={{
                display: `grid`,
                gridTemplateColumns: `1fr 1fr 1fr`,
                gap: `1rem`,
              }}
            >
              {filteredDois.map(doi => (
                <div
                  key={doi.id}
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    backgroundColor: theme.color.secondary,
                    padding: `0 1rem 0.71rem 1rem`,
                  }}
                  data-cy="data-product"
                >
                  <Label id="doi" color={theme.color.base}>
                    {doi.longname}
                  </Label>
                  <ExternalLink
                    label={doi.shortname}
                    url={`http://dx.doi.org/${doi.shortname}`}
                    id="doi"
                  ></ExternalLink>

                  {doi.campaigns.concat(doi.instruments).length ? (
                    <div
                      style={{
                        flex: `2.618`,
                        display: `grid`,
                        gap: `1rem`,
                        gridTemplateColumns: `1fr 1fr`,
                        padding: `.5rem`,
                      }}
                    >
                      <div data-cy="data-product-platforms">
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
                              {instrument.longname}
                            </small>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        flex: `2.618`,
                        display: `grid`,
                        padding: `1rem .5rem`,
                      }}
                    >
                      <Label id="doi-campaign">
                        No Related Campaigns or Instruments
                      </Label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </SectionContent>
    </SectionBlock>
  )
}

export const platformDataFields = graphql`
  fragment platformDataFields on platform {
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
