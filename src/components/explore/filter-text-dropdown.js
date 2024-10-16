import React, { useState } from "react"
import PropTypes from "prop-types"

import { CloseIcon, SearchIcon, InformationIcon } from "../../icons"
import { NEGATIVE, POSITIVE } from "../../utils/constants"
import { colors } from "../../theme"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
  ComboboxList,
  ComboboxOptionText,
} from "@reach/combobox"
import styled from "styled-components"
import { Tooltip } from "react-tooltip"

const FilterOption = styled(ComboboxOption)`
  [data-reach-combobox-option][aria-selected="true"] {
    background: ${colors[POSITIVE].background};
    opacity: 0.64;
  }
  [data-user-value] {
    font-weight: bold;
  }
`

const StyledComboboxList = styled(ComboboxList)`
  list-style: none;
  width: 100%;
  background: black;
  max-height: 60vh;
  overflow-y: scroll;
  margin: 0;
  [data-reach-combobox-option] {
    padding: 6px;
  }
  [data-reach-combobox-option]:hover {
    background: ${colors[NEGATIVE].background};
    opacity: 0.64;
    cursor: pointer;
  }
`

const StyledComboboxInput = styled(ComboboxInput)`
  background: transparent;
  color: white;
  width: 100%;
  height: 40px;
  max-height: 40px;
`
const DropdownByTextInput = ({
  secondaryOptions,
  selectedFilterIds,
  addFilter,
  removeFilter,
  placeholder,
  getMatchTerm,
  getFilterOptions,
  filterValue,
  filterLayoutWidth,
  hasLinkOut,
}) => {
  const [term, setTerm] = useState("")

  const handleInput = event => {
    setTerm(event.target.value)
  }
  const filteredOptions = useFilterOptions(term)

  const handleSelection = event => {
    const selection = filteredOptions.find(
      option => getMatchTerm(option) === event
    )
    const id = selection?.id ?? "None"
    selectedFilterIds.includes(id) ? removeFilter(id) : addFilter(id)
    setTerm("")
  }

  function useFilterOptions(term) {
    return React.useMemo(
      () =>
        term.trim() === "" ? null : getFilterOptions(secondaryOptions, term),
      [term]
    )
  }

  return (
    <div
      css={`
        width: ${filterLayoutWidth};
        position: relative;
        border: white 1px solid;
      `}
    >
      <Combobox onSelect={e => handleSelection(e)} value aria-label="Cities">
        <span
          css={`
            display: flex;
            align-items: center;
            .react-tooltip__show {
              z-index: 100;
              opacity: 100% !important;
            }
          `}
        >
          <span
            role="img"
            aria-label="Magnifying glass icon"
            css={`
              margin: 4px;
            `}
          >
            <SearchIcon color={colors[NEGATIVE].text} />
          </span>
          <StyledComboboxInput
            className="city-search-input"
            onChange={e => handleInput(e)}
            value={term}
            placeholder={placeholder}
            style={{ border: "unset" }}
          />
          {hasLinkOut && !term && (
            <>
              <a
                href={
                  "https://gcmd.earthdata.nasa.gov/KeywordViewer/scheme/all/e9f67a66-e9fc-435c-b720-ae32a2c3d8f5?gtm_keyword=EARTH%20SCIENCE&gtm_scheme=Earth%20Science "
                }
                target="_blank"
                rel="noreferrer"
                aria-label="Link to GCMD keywords"
                css={`
                  margin: 10px 10px 4px 10px;
                `}
                data-tooltip-id="GCMD-link"
              >
                <InformationIcon color={colors[NEGATIVE].text} />
              </a>
              <Tooltip
                id="GCMD-link"
                content="Variable filtering capacity in CASEI is based on the GCMD Science Keywords"
                place="bottom"
              />
            </>
          )}
        </span>

        {filteredOptions && (
          <ComboboxPopover className="shadow-popup">
            {filteredOptions.length > 0 ? (
              <StyledComboboxList>
                {filteredOptions.slice(0, 100).map((option, index) => {
                  return (
                    <FilterOption key={index} value={filterValue(option)}>
                      <ComboboxOptionText />
                    </FilterOption>
                  )
                })}
              </StyledComboboxList>
            ) : (
              <span
                style={{ display: "block", padding: 8, background: "black" }}
              >
                No variables found
              </span>
            )}
          </ComboboxPopover>
        )}
        {term && (
          <button
            onClick={() => {
              setTerm("")
            }}
            css={`
              position: absolute;
              top: 4px;
              right: 4px;
              border: none;
              background: transparent;
              color: ${colors[NEGATIVE].text};
              cursor: pointer;
            `}
            data-cy="reset"
          >
            <span role="img" aria-label="X icon">
              <CloseIcon color={colors[NEGATIVE].text} />
            </span>
          </button>
        )}
      </Combobox>
    </div>
  )
}

DropdownByTextInput.propTypes = {
  id: PropTypes.string.isRequired,
  selectedFilterIds: PropTypes.arrayOf(PropTypes.string),
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  secondaryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      shortname: PropTypes.string,
    })
  ).isRequired,
  category: PropTypes.string,
  placeholder: PropTypes.string,
  getMatchTerm: PropTypes.func,
  getFilterOptions: PropTypes.func,
  filterValue: PropTypes.func,
  filterLayoutWidth: PropTypes.string,
  hasLinkOut: PropTypes.bool,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
DropdownByTextInput.displayName = "DropdownByTextInput"

export default DropdownByTextInput
