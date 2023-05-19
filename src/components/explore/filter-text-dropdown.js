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
} from "@reach/combobox"
import { IconButton } from "../button"
import { FilterButton, FilterItem } from "./filter-menu"
import styled from "styled-components"

const FilterOption = styled(ComboboxOption)`
  [data-reach-combobox-option][aria-selected="true"] {
    background: ${colors[POSITIVE].background};
    opacity: 0.64;
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
  height: 42px;
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
    const [inputsize, setInputsize] = useState(50)
    const [term, setTerm] = useState("")

    const handleInput = event => {
      setTerm(event.target.value)
    }
    const handleSelection = event => {
      const value = { id: event }
      selectedFilterIds.includes(value) ? removeFilter(value) : addFilter(value)
      setTerm(event)
    }
    const filteredOptions = useFilterOptions(term)

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

      return React.useMemo(
        () =>
          term.trim() === ""
            ? null
            : secondaryOptions.filter(option => {
                return option.term.toLowerCase().startsWith(term.toLowerCase())
              }),
        [term]
      )
    }

    return (
      <div
        css={`
          width: 60%;
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
                  {filteredOptions.slice(0, 50).map((option, index) => (
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
                    />
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
