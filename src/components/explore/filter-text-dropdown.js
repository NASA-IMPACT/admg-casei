import React, { useState } from "react"
import PropTypes from "prop-types"

import { CloseIcon, SearchIcon } from "../../icons"
import { NEGATIVE, POSITIVE } from "../../utils/constants"
import { colors } from "../../theme"
import { VisuallyHidden } from "@reach/visually-hidden"
// import { ListboxInput, ListboxList, ListboxPopover } from "@reach/listbox"
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxOption,
  ComboboxList,
  ComboboxOptionText,
} from "@reach/combobox"
import { IconButton } from "../button"
import { FilterButton, FilterItem } from "./filter-menu"
import styled from "styled-components"

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
  height: 41px;
  max-height: 41px;
`
const DropdownByTextInput = React.forwardRef(
  (
    {
      options,
      secondaryOptions,
      id,
      selectedFilterIds,
      addFilter,
      removeFilter,
    },
    ref
  ) => {
    const [term, setTerm] = useState("")

    const handleInput = event => {
      setTerm(event.target.value)
    }
    const filteredOptions = useFilterOptions(term)

    const handleSelection = event => {
      const selection = filteredOptions.find(
        option =>
          `${[
            option.term,
            option.variable_1,
            option.variable_2,
            option.variable_3,
          ]
            .filter(item => item !== "")
            .join(" > ")}` === event
      )
      const id = selection?.id ?? "None"

      //TODO add what we matched on term, variable_1, variable_2, or variable_3 (only one can be matched at a time)

      selectedFilterIds.includes(id) ? removeFilter(id) : addFilter(id)
      setTerm("")
    }

    // const debounced = useDebouncedCallback(
    //   // function
    //   value => {
    //     return setFilteredOptions(
    //       options.filter(option => {
    //         return option.shortname
    //           .toLowerCase()
    //           .startsWith(value.toLowerCase())
    //       })
    //     )
    //   },
    //   // delay in ms
    //   400
    // )

    function useFilterOptions(term) {
      //   const throttledTerm = useThrottledCallback(() => term, 100)

      // TODO update to match on all variables and terms
      return React.useMemo(
        () =>
          term.trim() === ""
            ? null
            : secondaryOptions.filter(option => {
                return (
                  option.term.toLowerCase().startsWith(term.toLowerCase()) ||
                  option.variable_1
                    .toLowerCase()
                    .startsWith(term.toLowerCase()) ||
                  option.variable_2
                    .toLowerCase()
                    .startsWith(term.toLowerCase()) ||
                  option.variable_3.toLowerCase().startsWith(term.toLowerCase())
                )
              }),
        [term]
      )
    }

    return (
      <div
        css={`
          width: 60%;
          position: relative;
        `}
      >
        <Combobox onSelect={e => handleSelection(e)} value aria-label="Cities">
          <span
            css={`
              display: flex;
              align-items: center;
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
              placeholder={"Enter a variable"}
              style={{ border: "unset" }}
            />
          </span>
          {filteredOptions && (
            <ComboboxPopover className="shadow-popup">
              {filteredOptions.length > 0 ? (
                <StyledComboboxList>
                  {filteredOptions.slice(0, 100).map((option, index) => (
                    <FilterOption
                      key={index}
                      value={`${[
                        option.term,
                        option.variable_1,
                        option.variable_2,
                        option.variable_3,
                      ]
                        .filter(item => item !== "")
                        .join(" > ")}`}
                    >
                      <ComboboxOptionText />
                    </FilterOption>
                  ))}
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
)

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
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
DropdownByTextInput.displayName = "DropdownByTextInput"

export default DropdownByTextInput
