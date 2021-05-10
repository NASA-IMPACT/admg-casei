import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDebouncedCallback } from "use-debounce"

import { CloseIcon, SearchIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const FilterByTextInput = React.forwardRef(
  ({ setSearchResult, category }, ref) => {
    const [inputsize, setInputsize] = useState(50)

    const debounced = useDebouncedCallback(
      // function
      value => setSearchResult(prev => ({ ...prev, [category]: value })),
      // delay in ms
      400
    )

    return (
      <div
        css={`
          border: 1px solid ${colors[NEGATIVE].text};
          padding: 0.25rem;
          flex-grow: 1;
          width: 30rem;
          display: flex;
          align-content: stretch;
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
          aria-label={`Filter ${category.slice(0, -1)} by name`}
          name="filter by name"
          placeholder={`Enter ${category.slice(0, -1)} name`}
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
      </div>
    )
  }
)

FilterByTextInput.propTypes = {
  setSearchResult: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaigns", "platforms", "instruments"]),
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
FilterByTextInput.displayName = "FilterByTextInput"

export default FilterByTextInput
