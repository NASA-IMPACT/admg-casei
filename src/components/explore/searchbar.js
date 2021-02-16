import React, { useState } from "react"
import { CloseIcon, SearchIcon } from "../../icons"
import { colors } from "../../utils/theme"

const Searchbar = React.forwardRef((_props, ref) => {
  const [inputsize, setInputsize] = useState(50)

  return (
    <div
      css={`
        display: flex;
        height: 2.5rem;
        flex-grow: 1;
        border: 1px solid ${colors.darkTheme.text};
        padding: 0.25rem;
      `}
    >
      <button
        type="submit"
        css={`
          border: none;
          flexgrow: 0;
          background: transparent;
          color: ${colors.darkTheme.text};
          verticalalign: middle;
        `}
        data-cy="submit"
      >
        <span role="img" aria-label="Magnifying glass icon">
          <SearchIcon color={colors.darkTheme.text} />
        </span>
      </button>
      <div
        css={`
          flex-grow: 1;
        `}
      >
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
            color: ${colors.darkTheme.text};
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
              color: ${colors.darkTheme.text};
              vertical-align: middle;
            `}
            data-cy="reset"
          >
            <span role="img" aria-label="X icon">
              <CloseIcon color={colors.darkTheme.text} />
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
