import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDebouncedCallback } from "use-debounce"

import { CloseIcon, SearchIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors, breakpoints } from "../../theme"
import { IconButton } from "../button"

const FilterByTextInput = React.forwardRef(
  ({ setSearchResult, category }, ref) => {
    const [inputsize, setInputsize] = useState(50)

    const debounced = useDebouncedCallback(
      // function
      value => setSearchResult(value),
      // delay in ms
      400
    )

    return (
      <div
        css={`
          border: 1px solid ${colors[NEGATIVE].text};
          padding: 0.25rem;
          flex: 1;
          max-width: 100%;
          flex-basis: 100%;
          display: flex;
          align-content: stretch;
          align-items: center;
          @media screen and (min-width: ${breakpoints["sm"]}) {
            width: 30rem;
            flex-basis: inherit;
          }
        `}
      >
        <IconButton
          data-cy="submit"
          icon={<SearchIcon color={colors[NEGATIVE].text} />}
          type="submit"
        />
        <input
          autoComplete="off"
          data-cy="explore-input"
          aria-label={`Filter ${category} by name`}
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
          <IconButton
            type="reset"
            action={() => setInputsize(50)}
            data-cy="reset"
            icon={<CloseIcon color={colors[NEGATIVE].text} />}
            aria-label="X icon"
          />
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
