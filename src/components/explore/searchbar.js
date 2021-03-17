import React, { useState } from "react"

import { CloseIcon, SearchIcon } from "../../icons"
import { NEGATIVE } from "../../utils/constants"
import { colors } from "../../theme"

const Searchbar = React.forwardRef((_props, ref) => {
  const [inputsize, setInputsize] = useState(50)

  return (
    <div
      css={`
        flex-grow: 1;
        display: flex;
        height: 2.5rem;
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
          type="submit"
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
          aria-label="Search for campaigns, platforms or instruments"
          name="search"
          placeholder="Search for campaigns, platforms or instruments"
          onChange={e => setInputsize(Math.min(e.target.value.length, 140))}
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
})

// https://reactjs.org/docs/forwarding-refs.html#displaying-a-custom-name-in-devtools
Searchbar.displayName = "Searchbar"

export default Searchbar
