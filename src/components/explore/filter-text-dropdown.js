import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDebouncedCallback } from "use-debounce"

import { CloseIcon, SearchIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

import { IconButton } from "../button"
import styled from "styled-components"

export const FilterPopover = styled.div`
  display: grid;
  padding: 10px;
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  background: black;
`

const DropdownByTextInput = React.forwardRef(
  ({ options, id, selectedFilterIds, addFilter, removeFilter }, ref) => {
    const [inputsize, setInputsize] = useState(50)
    // const handleSelection = value => {
    //   selectedFilterIds.includes(value) ? removeFilter(value) : addFilter(value)
    //   setValue("")
    // }
    const [filteredOptions, setFilteredOptions] = useState([])

    // let [value, setValue] = useState("")
    const debounced = useDebouncedCallback(
      // function
      value => {
        return setFilteredOptions(
          options.filter(option => {
            console.log(option.shortname)
            return option.shortname
              .toLowerCase()
              .startsWith(value.toLowerCase())
          })
        )
      },
      // delay in ms
      400
    )
    console.log({ filteredOptions })
    return (
      <div
        css={`
          border: 1px solid ${colors[NEGATIVE].text};
          padding: 0.25rem;
          flex-grow: 1;
          width: 30rem;
          display: flex;
          align-content: stretch;
          position: relative;
        `}
      >
        <button
          css={`
            border: none;
            flex-grow: 0;
            background: transparent;
            color: ${colors[NEGATIVE].text};
            vertical-align: middle;
          `}
          data-cy="submit"
        >
          <span role="img" aria-label="Magnifying glass icon">
            <SearchIcon color={colors[NEGATIVE].text} />
          </span>
        </button>
        <input
          autoComplete="off"
          data-cy="explore-input"
          aria-label={`Filter products by variable name`}
          name="filter by name"
          placeholder={`Enter a variable`}
          maxLength="50"
          onChange={e => {
            e.preventDefault()
            setInputsize(Math.min(e.target.value.length, 50))
            debounced(e.target.value)
          }}
          size={inputsize}
          css={`
            border: none;
            background: transparent;
            color: ${colors[NEGATIVE].text};
            font-style: italic;
          `}
          type="text"
          ref={ref}
        />
        {ref.current?.value && (
          <button
            type="reset"
            onClick={() => setInputsize(50)}
            css={`
              border: none;
              flex-grow: 0;
              background: transparent;
              color: ${colors[NEGATIVE].text};
              vertical-align: middle;
            `}
            data-cy="reset"
          >
            <span role="img" aria-label="X icon">
              <CloseIcon color={colors[NEGATIVE].text} />
            </span>
          </button>
        )}

        <FilterPopover>
          {filteredOptions.map(o => (
            <div
              key={o.id}
              data-cy="filter-option"
              //   selected={!!selectedFilterIds.includes(o.id)}
            >
              {o.shortname}
              {selectedFilterIds.includes(o.id) && (
                <IconButton
                  id="remove-filter"
                  icon={<CloseIcon color={colors[NEGATIVE].text} />}
                />
              )}
            </div>
          ))}
        </FilterPopover>
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
    })
  ).isRequired,
  category: PropTypes.string,
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
DropdownByTextInput.displayName = "DropdownByTextInput"

export default DropdownByTextInput
