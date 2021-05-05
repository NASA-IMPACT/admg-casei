import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDebouncedCallback } from "use-debounce"

import { CloseIcon, SearchIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const FilterByTextInput = React.forwardRef(
  ({ submitSearch, category }, ref) => {
    const [inputsize, setInputsize] = useState(50)

    const debounced = useDebouncedCallback(
      // function
      value => submitSearch(value),
      // delay in ms
      1000
    )

    return (
      <div
        css={`
          flex-grow: 1;
          display: flex;
          align-content: stretch;
        `}
      >
        <div
          css={`
            border: 1px solid ${colors[NEGATIVE].text};
            padding: 0.25rem;
            flex-grow: 1;
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
            aria-label={`Filter ${category} by name`}
            name="filter by name"
            placeholder="Enter name"
            onChange={e => {
              e.preventDefault()
              setInputsize(Math.min(e.target.value.length, 140))
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
      </div>
    )
  }
)

FilterByTextInput.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  category: PropTypes.oneOf(["campaign", "platform", "instrument"]),
}

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
FilterByTextInput.displayName = "FilterByTextInput"

export default FilterByTextInput
