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
    setSelectedFilterIds([...selectedFilterIds, value.id])
    selectedFilterIds.includes(value.id)
      ? setSelectedFilterIds(selectedFilterIds.filter(f => f !== value.id))
      : setSelectedFilterIds([...selectedFilterIds, value.id])
    setValue("")
  }

  return (
    <>
      <VisuallyHidden id="sort-order">{filterName}</VisuallyHidden>
      <ListboxInput
        aria-labelledby="sort order"
        defaultValue={value}
        onChange={value => handleSelection(value)}
        data-cy="sort-select"
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
              <ListboxOption key={o} value={o} data-cy="sort-option">
                {o.shortname.toUpperCase()}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </>
  )
}

const DataSection = ({ id, dois }) => {
  let [selectedFilterIds, setSelectedFilterIds] = useState([])

  const clearFilters = () => setSelectedFilterIds([])

  const filteredDois = selectedFilterIds.length
    ? dois.filter(
        doi =>
          doi.platforms
            .map(platform => platform.id)
            .some(id => selectedFilterIds.includes(id)) ||
          doi.instruments
            .map(instrument => instrument.id)
            .some(id => selectedFilterIds.includes(id))
      )
    : dois

  return (
    <SectionBlock id={id}>
      <SectionHeader headline="Data Products" id={id} />
      <SectionContent>
        <>
          <Filter
            filterOptions={[...new Set(dois.map(doi => doi.platforms).flat())]}
            filterName="Platforms"
            setSelectedFilterIds={setSelectedFilterIds}
            selectedFilterIds={selectedFilterIds}
          />
          <Filter
            filterOptions={[
              ...new Set(dois.map(doi => doi.instruments).flat()),
            ]}
            filterName="Instruments"
            setSelectedFilterIds={setSelectedFilterIds}
            selectedFilterIds={selectedFilterIds}
          />
        </>
        <div
          style={{
            display: `grid`,
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr) )`,
            gap: `1rem`,
          }}
        >
          {dois.length < 1
            ? "No data products available."
            : filteredDois.map(doi => (
                <div
                  key={doi.id}
                  style={{
                    display: `flex`,
                    flexDirection: `column`,
                    // border: `1px solid ${theme.color.base}`,
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
                      <Label id="doi-platform" showBorder>
                        Platforms
                      </Label>
                      {doi.platforms.map(platform => (
                        <Link key={platform.id} to={`/platform/${platform.id}`}>
                          <small>{platform.longname}</small>
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
                </div>
              ))}
        </div>
      </SectionContent>
    </SectionBlock>
  )
}

export const dataFields = graphql`
  fragment dataFields on campaign {
    dois {
      shortname: short_name
      longname: long_name
      id
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
